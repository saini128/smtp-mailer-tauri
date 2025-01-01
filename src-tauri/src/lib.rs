use std::fs::File;
use std::io::{Write, Read};
use std::path::Path;
use lettre::{Message,SmtpTransport,Transport};
use lettre::message::Mailbox;
use lettre::transport::smtp::{authentication::{Credentials}}; 
use dirs::config_dir; 
use std::fs;  

#[tauri::command]
fn store_smtp_credentials(username: String, password: String, host: String, port: String) -> Result<String, String> {
    
    let config_path = config_dir().ok_or("Unable to get config directory")?;

    
    let smtp_mailer_path = config_path.join("smtp-mailer");

    
    if !smtp_mailer_path.exists() {
        fs::create_dir_all(&smtp_mailer_path).map_err(|e| e.to_string())?;
    }

    
    let credentials_path = smtp_mailer_path.join("smtp_credentials.txt");

    
    let credentials = format!("{}:{}:{}:{}", username, password, host, port);

    
    let mut file = File::create(credentials_path).map_err(|e| e.to_string())?;
    file.write_all(credentials.as_bytes()).map_err(|e| e.to_string())?;

    Ok("SMTP credentials stored successfully".to_string())
}


#[tauri::command]
fn read_smtp_credentials() -> Result<String, String> {
    let config_path = config_dir().ok_or("Unable to get config directory")?;

    
    let smtp_mailer_path = config_path.join("smtp-mailer");
    let credentials_path = smtp_mailer_path.join("smtp_credentials.txt");

    if !credentials_path.exists() {
        return Err("SMTP credentials file not found".to_string());
    }

    let mut file = File::open(credentials_path).map_err(|e| e.to_string())?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).map_err(|e| e.to_string())?;

    Ok(contents)
}

#[tauri::command]
fn delete_smtp_credentials() -> String {
    // Get the config directory
    if let Some(config_path) = config_dir() {
        let smtp_mailer_path = config_path.join("smtp-mailer");
        let file_path = smtp_mailer_path.join("smtp_credentials.txt");

        // Check if the credentials file exists
        if Path::new(&file_path).exists() {
            // Remove the credentials file
            if let Err(e) = fs::remove_file(file_path) {
                return format!("Error deleting credentials: {}", e);
            }
            return "Credentials deleted successfully!".to_string();
        } else {
            return "No credentials found.".to_string();
        }
    }
    "Unable to get config directory.".to_string()
}

#[tauri::command]
fn get_smtp_credentials() -> Option<String> {
    // Get the config directory
    if let Some(config_path) = config_dir() {
        let smtp_mailer_path = config_path.join("smtp-mailer");
        let file_path = smtp_mailer_path.join("smtp_credentials.txt");

        // Check if the credentials file exists
        if Path::new(&file_path).exists() {
            let mut file = File::open(file_path).unwrap();
            let mut contents = String::new();
            if let Err(e) = file.read_to_string(&mut contents) {
                eprintln!("Error reading credentials: {}", e);
                return None;
            }
            return Some(contents);
        }
    }
    None
}



#[tauri::command]
async fn send_email(from: String, to: String, cc: String, subject: String, message: String) -> String {
    println!("Sending email from: {}", from);
    
    // Get SMTP credentials
    let smtp_credentials = get_smtp_credentials().unwrap_or_default();
    let credentials: Vec<&str> = smtp_credentials.split(":").collect();

    if credentials.len() != 4 {
        return "Invalid SMTP credentials".to_string();
    }

    let smtp_username = credentials[0].to_string();
    let smtp_password = credentials[1].to_string();
    let smtp_host = credentials[2].to_string();
    let smtp_port = credentials[3].to_string();

    // Parse the "from" field
    let from_parsed = from
        .split_once('<')
        .and_then(|(name, email)| {
            let email = email.trim_end_matches('>').trim();
            Some(Mailbox::new(Some(name.trim().to_string()), email.parse().unwrap()))
        })
        .unwrap_or_else(|| {
            Mailbox::new(None, from.parse().unwrap())
        });

    // Parse multiple recipients in "to" and "cc"
    let to_recipients: Vec<Mailbox> = to
        .split(',')
        .filter_map(|email| email.trim().parse().ok())
        .map(|email| Mailbox::new(None, email))
        .collect();

    let cc_recipients: Vec<Mailbox> = cc
        .split(',')
        .filter_map(|email| email.trim().parse().ok())
        .map(|email| Mailbox::new(None, email))
        .collect();

    // Build the email
    let mut email_builder = Message::builder()
        .from(from_parsed)
        .subject(subject);

    // Add "to" recipients
    for recipient in to_recipients {
        email_builder = email_builder.to(recipient);
    }

    // Add "cc" recipients
    for recipient in cc_recipients {
        email_builder = email_builder.cc(recipient);
    }

    let email = email_builder.body(message).unwrap();

    // Create SMTP client and send email
    let creds = Credentials::new(smtp_username, smtp_password);
    let client = SmtpTransport::starttls_relay(&smtp_host)
        .unwrap()
        .credentials(creds)
        .build();

    match client.send(&email) {
        Ok(_) => "Email sent successfully".to_string(),
        Err(e) => format!("Failed to send email: {}", e),
    }
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            store_smtp_credentials,
            read_smtp_credentials,
            delete_smtp_credentials,
            get_smtp_credentials,
            send_email
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
