
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TerminalLine {
  id: string;
  text: string;
  type: 'prompt' | 'command' | 'output' | 'empty' | 'clear';
  isTyped?: boolean;
  commandSpeed?: number;
}

const SCRIPT_COMMAND_SPEED = 70;
const SCRIPT_LINE_DELAY = 200;
const SCRIPT_CYCLE_DELAY = 4000;

const initialScripts: TerminalLine[][] = [
  [
    { id: 's1_l1', text: 'M.Salman@portfolio:~$ ', type: 'prompt' },
    { id: 's1_l2', text: './show_skills.sh --level=expert', type: 'command', isTyped: true },
    { id: 's1_l3', text: 'Executing skill assessment...', type: 'output' },
    { id: 's1_l4', text: '[+] Penetration Testing (eJPT, OWASP)', type: 'output' },
    { id: 's1_l5', text: '[+] Secure Development (Go, Python, DevSecOps)', type: 'output' },
    { id: 's1_l6', text: '[+] Automation & Scripting (Bash, Python)', type: 'output' },
    { id: 's1_l7', text: '[+] Cloud Security Basics (AWS)', type: 'output' },
  ],
  [
    { id: 's2_l1', text: 'M.Salman@portfolio:~$ ', type: 'prompt' },
    { id: 's2_l2', text: 'git log --author="M. Salman" --since="1 month ago" --oneline | head -n 3', type: 'command', isTyped: true, commandSpeed: 50 },
    { id: 's2_l3', text: 'ae12bf3 (feat): Implement advanced threat modeling module', type: 'output' },
    { id: 's2_l4', text: 'cb88fa1 (fix): Resolve buffer overflow in network parser', type: 'output' },
    { id: 's2_l5', text: '01d3c57 (chore): Update CI pipeline for automated security scans', type: 'output' },
  ],
  [
    { id: 's3_l1', text: 'M.Salman@portfolio:~$ ', type: 'prompt' },
    { id: 's3_l2', text: 'run_exploit_simulation.py --target=test_env --module=all', type: 'command', isTyped: true },
    { id: 's3_l3', text: 'WARNING: Simulation mode active. No real systems affected.', type: 'output' },
    { id: 's3_l4', text: '  [>] Testing Web App vulnerabilities... Found: SQLi, XSS (Simulated)', type: 'output' },
    { id: 's3_l5', text: '  [>] Testing Network services... Found: Open RDP, Weak SMB (Simulated)', type: 'output' },
    { id: 's3_l6', text: 'Simulation complete. Report generated: /logs/sim_report.txt', type: 'output' },
  ],
  [
    { id: 's4_l1', text: 'M.Salman@portfolio:~$ ', type: 'prompt' },
    { id: 's4_l2', text: 'sudo apt update && sudo apt install awesome-security-tool -y', type: 'command', isTyped: true, commandSpeed: 60 },
    { id: 's4_l3', text: 'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease', type: 'output' },
    { id: 's4_l4', text: 'Get:2 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]', type: 'output' },
    { id: 's4_l5', text: 'Fetched 110 kB in 1s (105 kB/s)', type: 'output' },
    { id: 's4_l6', text: 'Reading package lists... Done', type: 'output' },
    { id: 's4_l7', text: 'Building dependency tree... Done', type: 'output' },
    { id: 's4_l8', text: 'Reading state information... Done', type: 'output' },
    { id: 's4_l9', text: 'awesome-security-tool is already the newest version (1.2.3).', type: 'output' },
    { id: 's4_l10', text: '0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.', type: 'output' },
  ],
  [
    { id: 's5_l1', text: 'M.Salman@portfolio:~/projects/goprobe$ ', type: 'prompt' },
    { id: 's5_l2', text: 'go build -o net_analyzer', type: 'command', isTyped: true },
    { id: 's5_l3', text: 'Compilation successful. Output: net_analyzer', type: 'output' },
    { id: 's5_l4', text: 'M.Salman@portfolio:~/projects/goprobe$ ', type: 'prompt' },
    { id: 's5_l5', text: './net_analyzer --host scanme.nmap.org --ports 80,443,22', type: 'command', isTyped: true, commandSpeed: 50 },
    { id: 's5_l6', text: 'Scanning scanme.nmap.org...', type: 'output' },
    { id: 's5_l7', text: '  [+] Port 22 (SSH) : Open', type: 'output' },
    { id: 's5_l8', text: '  [+] Port 80 (HTTP): Open', type: 'output' },
    { id: 's5_l9', text: '  [-] Port 443 (HTTPS): Filtered', type: 'output' },
    { id: 's5_l10', text: 'Scan finished.', type: 'output' },
  ],
  [
    { id: 's6_l1', text: 'M.Salman@portfolio:~/dev/python/vuln_scanner_project$ ', type: 'prompt' },
    { id: 's6_l2', text: 'ls -lah', type: 'command', isTyped: true, commandSpeed: 100 },
    { id: 's6_l3', text: 'total 52K', type: 'output' },
    { id: 's6_l4', text: 'drwxr-xr-x  5 msalman msalman 4.0K Jul 21 10:15 .', type: 'output' },
    { id: 's6_l5', text: 'drwxr-xr-x 12 msalman msalman 4.0K Jul 18 15:30 ..', type: 'output' },
    { id: 's6_l6', text: '-rw-r--r--  1 msalman msalman  512 Jul 19 09:15 config.yaml', type: 'output' },
    { id: 's6_l7', text: '-rwxr-xr-x  1 msalman msalman  12K Jul 21 09:55 scanner_core.py', type: 'output' },
    { id: 's6_l8', text: 'drwxr-xr-x  2 msalman msalman 4.0K Jul 19 11:00 modules', type: 'output' },
    { id: 's6_l9', text: '-rw-r--r--  1 msalman msalman 1.5K Jul 18 16:00 README.md', type: 'output' },
    { id: 's6_l10', text: 'drwxr-xr-x  3 msalman msalman 4.0K Jul 20 14:00 results', type: 'output' },
  ],
  [
    { id: 's7_l1', text: 'M.Salman@pentest-box:~$ ', type: 'prompt' },
    { id: 's7_l2', text: 'nmap -sV --script http-vuln-cve2017-5638 192.168.1.101', type: 'command', isTyped: true, commandSpeed: 40 },
    { id: 's7_l3', text: 'Starting Nmap 7.92 ( https://nmap.org ) at 2024-10-27 10:00 UTC', type: 'output' },
    { id: 's7_l4', text: 'Nmap scan report for 192.168.1.101', type: 'output' },
    { id: 's7_l5', text: 'Host is up (0.0020s latency).', type: 'output' },
    { id: 's7_l6', text: 'PORT   STATE SERVICE VERSION', type: 'output' },
    { id: 's7_l7', text: '80/tcp open  http    Apache httpd 2.4.29 ((Ubuntu))', type: 'output' },
    { id: 's7_l8', text: '| http-vuln-cve2017-5638:', type: 'output' },
    { id: 's7_l9', text: '|   VULNERABLE:', type: 'output' },
    { id: 's7_l10', text: '|   Apache Struts2 S2-045 Remote Code Execution', type: 'output' },
    { id: 's7_l11', text: '|     State: VULNERABLE (Exploitable)', type: 'output' },
    { id: 's7_l12', text: '|     IDs:  CVE:CVE-2017-5638', type: 'output' },
    { id: 's7_l13', text: 'Nmap done: 1 IP address (1 host up) scanned in 7.80 seconds', type: 'output' },
  ],
  [
    { id: 's8_l1', text: 'M.Salman@recon-station:~$ ', type: 'prompt' },
    { id: 's8_l2', text: 'curl -I https://example.com', type: 'command', isTyped: true, commandSpeed: 80 },
    { id: 's8_l3', text: 'HTTP/2 200', type: 'output' },
    { id: 's8_l4', text: 'server: cloudflare', type: 'output' },
    { id: 's8_l5', text: 'date: Mon, 27 Oct 2024 10:05:00 GMT', type: 'output' },
    { id: 's8_l6', text: 'content-type: text/html; charset=UTF-8', type: 'output' },
    { id: 's8_l7', text: 'last-modified: Sun, 26 Oct 2024 12:00:00 GMT', type: 'output' },
    { id: 's8_l8', text: 'cache-control: max-age=600', type: 'output' },
  ],
  [
    { id: 's9_l1', text: 'M.Salman@webfuzz-lab:~$ ', type: 'prompt' },
    { id: 's9_l2', text: 'ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt -u https://target.site/FUZZ -mc 200,301,403 -fs 1234', type: 'command', isTyped: true, commandSpeed: 40 },
    { id: 's9_l3', text: '        /' + '::' + '/ /‾‾/' + '::' + '/‾‾/ /‾‾/' + '::' + '/‾‾/' + '::' + '/‾‾/         V2.0.0', type: 'output' },
    { id: 's9_l4', text: '       /' + '::' + '/_/‾‾/' + '::' + '/_/ /_/ /‾‾/' + '::' + '/_/ /‾‾/' + '::' + '/_/          Kali P&T', type: 'output' },
    { id: 's9_l5', text: '      /' + '::' + '/ /  /' + '::' + '/ / / / /__' + '::' + '/ / /__' + '::' + '/ /           Forked from github.com/ffuf/ffuf', type: 'output' },
    { id: 's9_l6', text: '     /' + '::' + '/_/  /' + '::' + '/_/ /_/____/' + '::' + '/_/____/' + '::' + '/_/ ffuf.dev@gmail.com', type: 'output' },
    { id: 's9_l7', text: '_________________________________________________________________/', type: 'output' },
    { id: 's9_l8', text: ' :: Method           : GET', type: 'output' },
    { id: 's9_l9', text: ' :: URL              : https://target.site/FUZZ', type: 'output' },
    { id: 's9_l10', text: ' :: Wordlist         : /usr/share/seclists/Discovery/Web-Content/common.txt', type: 'output' },
    { id: 's9_l11', text: ' :: Follow redirects : false', type: 'output' },
    { id: 's9_l12', text: ' :: Calibration      : false', type: 'output' },
    { id: 's9_l13', text: ' :: Timeout          : 10', type: 'output' },
    { id: 's9_l14', text: ' :: Threads          : 40', type: 'output' },
    { id: 's9_l15', text: ' :: Matcher          : Response status: 200,301,403', type: 'output' },
    { id: 's9_l16', text: ' :: Filter           : Response size: 1234', type: 'output' },
    { id: 's9_l17', text: '_________________________________________________________________/', type: 'output' },
    { id: 's9_l18', text: '', type: 'empty' },
    { id: 's9_l19', text: 'admin                   [Status: 301, Size: 178, Words: 5, Lines: 10]', type: 'output' },
    { id: 's9_l20', text: 'images                  [Status: 200, Size: 1024, Words: 80, Lines: 50]', type: 'output' },
    { id: 's9_l21', text: 'login.php               [Status: 200, Size: 1530, Words: 120, Lines: 75]', type: 'output' },
    { id: 's9_l22', text: '.git                    [Status: 403, Size: 286, Words: 20, Lines: 12]', type: 'output' },
    { id: 's9_l23', text: ':: Progress: [4614/4614] :: Job [1/1] :: 230 req/sec :: Duration: [0:00:20] :: Errors: 0 ::', type: 'output' },
  ],
  [
    { id: 's10_l1', text: 'M.Salman@devbox:~/scripts$ ', type: 'prompt' },
    { id: 's10_l2', text: 'python3 simple_port_scanner.py target.host 80 443 22', type: 'command', isTyped: true, commandSpeed: 60 },
    { id: 's10_l3', text: 'Scanning target.host...', type: 'output' },
    { id: 's10_l4', text: '[+] Port 22 (ssh): Open', type: 'output' },
    { id: 's10_l5', text: '[+] Port 80 (http): Open', type: 'output' },
    { id: 's10_l6', text: '[-] Port 443 (https): Closed', type: 'output' },
    { id: 's10_l7', text: 'Scan complete.', type: 'output' },
  ],
  [
    { id: 's11_l1', text: 'M.Salman@project-alpha:~/src/webapp$ ', type: 'prompt' },
    { id: 's11_l2', text: 'git status', type: 'command', isTyped: true, commandSpeed: 90 },
    { id: 's11_l3', text: 'On branch main', type: 'output' },
    { id: 's11_l4', text: "Your branch is up to date with 'origin/main'.", type: 'output' },
    { id: 's11_l5', text: 'Changes not staged for commit:', type: 'output' },
    { id: 's11_l6', text: '  (use "git add <file>..." to update what will be committed)', type: 'output' },
    { id: 's11_l7', text: '  (use "git restore <file>..." to discard changes in working directory)', type: 'output' },
    { id: 's11_l8', text: '        modified:   README.md', type: 'output' },
    { id: 's11_l9', text: 'Untracked files:', type: 'output' },
    { id: 's11_l10', text: '  (use "git add <file>..." to include in what will be committed)', type: 'output' },
    { id: 's11_l11', text: '        new_feature.py', type: 'output' },
    { id: 's11_l12', text: '', type: 'empty' },
    { id: 's11_l13', text: 'no changes added to commit (use "git add" and/or "git commit -a")', type: 'output' },
    { id: 's11_l14', text: 'M.Salman@project-alpha:~/src/webapp$ ', type: 'prompt' },
    { id: 's11_l15', text: 'git add README.md new_feature.py', type: 'command', isTyped: true, commandSpeed: 70 },
    { id: 's11_l16', text: 'M.Salman@project-alpha:~/src/webapp$ ', type: 'prompt' },
    { id: 's11_l17', text: 'git commit -m "feat: Add new_feature.py and update README"', type: 'command', isTyped: true, commandSpeed: 50 },
    { id: 's11_l18', text: '[main abc1234] feat: Add new_feature.py and update README', type: 'output' },
    { id: 's11_l19', text: ' 2 files changed, 15 insertions(+)', type: 'output' },
    { id: 's11_l20', text: ' create mode 100644 new_feature.py', type: 'output' },
  ]
];

const scripts = [...initialScripts].sort(() => Math.random() - 0.5);

const TerminalEffect: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentTypedChars, setCurrentTypedChars] = useState<Record<string, string>>({});
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const [currentLineInScript, setCurrentLineInScript] = useState(0);
  const [isCycling, setIsCycling] = useState(true);
  const [showCursorForLine, setShowCursorForLine] = useState<string | null>(null);
  const [terminalTitle, setTerminalTitle] = useState("bash -- M.Salman@portfolio: ~");

  const terminalContentRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const isCyclingRef = useRef(isCycling);

  const typingTimeoutRef = useRef<number | null>(null);
  const lineAdvanceTimeoutRef = useRef<number | null>(null);
  const scriptCycleTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    isCyclingRef.current = isCycling;
  }, [isCycling]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearAllPendingTimeouts();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAllPendingTimeouts = useCallback(() => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (lineAdvanceTimeoutRef.current) clearTimeout(lineAdvanceTimeoutRef.current);
    if (scriptCycleTimeoutRef.current) clearTimeout(scriptCycleTimeoutRef.current);
    typingTimeoutRef.current = null;
    lineAdvanceTimeoutRef.current = null;
    scriptCycleTimeoutRef.current = null;
  }, []);

  const typeCharacter = useCallback((line: TerminalLine, charIndex: number) => {
    if (!isCyclingRef.current || !isMountedRef.current) {
      setShowCursorForLine(null);
      return;
    }

    if (charIndex < line.text.length) {
      setCurrentTypedChars(prev => ({ ...prev, [line.id]: (prev[line.id] || '') + line.text[charIndex] }));
      typingTimeoutRef.current = window.setTimeout(() => {
        if (isCyclingRef.current && isMountedRef.current) {
          typeCharacter(line, charIndex + 1);
        } else {
          setShowCursorForLine(null);
        }
      }, line.commandSpeed || SCRIPT_COMMAND_SPEED);
    } else {
      setShowCursorForLine(null);
      lineAdvanceTimeoutRef.current = window.setTimeout(() => {
        if (isCyclingRef.current && isMountedRef.current) {
          setCurrentLineInScript(prev => prev + 1);
        }
      }, SCRIPT_LINE_DELAY / 2);
    }
  }, [SCRIPT_COMMAND_SPEED, SCRIPT_LINE_DELAY]);

  useEffect(() => {
    clearAllPendingTimeouts(); // Clear any previous timeouts before starting new logic

    if (!isCyclingRef.current || !isMountedRef.current) {
      if (!isCyclingRef.current) setShowCursorForLine(null); // Hide cursor if paused
      return;
    }

    const currentScript = scripts[currentScriptIndex];
    if (!currentScript) return; // Should not happen if scripts array is populated

    if (currentLineInScript >= currentScript.length) {
      // Script finished, schedule next script
      scriptCycleTimeoutRef.current = window.setTimeout(() => {
        if (isCyclingRef.current && isMountedRef.current) {
          setDisplayedLines([{ id: `clear-${Date.now()}`, text: 'clear', type: 'clear' }]);
          setCurrentTypedChars({});
          setCurrentLineInScript(0);
          setCurrentScriptIndex(prev => (prev + 1) % scripts.length);
          setTerminalTitle("bash -- M.Salman@portfolio: ~");
        }
      }, SCRIPT_CYCLE_DELAY);
      return;
    }

    const lineToAdd = currentScript[currentLineInScript];

    if (lineToAdd.type === 'clear') {
      setDisplayedLines([]);
      setCurrentTypedChars({});
      lineAdvanceTimeoutRef.current = window.setTimeout(() => {
        if (isCyclingRef.current && isMountedRef.current) {
          setCurrentLineInScript(prev => prev + 1);
        }
      }, SCRIPT_LINE_DELAY);
      return;
    }

    if (lineToAdd.type === 'prompt') {
      const match = lineToAdd.text.match(/@([^:]+):([^$]+)\$/);
      if (match) {
        setTerminalTitle(`bash -- ${match[1]}:${match[2]}`);
      } else {
        setTerminalTitle("bash -- M.Salman@portfolio: ~");
      }
    }
    
    // Add line to display if not already there or if it's a prompt (prompts can repeat)
     setDisplayedLines(prevLines => {
      if (prevLines.find(l => l.id === lineToAdd.id) && lineToAdd.type !== 'prompt') return prevLines;
      return [...prevLines, lineToAdd];
    });


    if (lineToAdd.type === 'command' && lineToAdd.isTyped) {
      // Ensure currentTypedChars has an entry for this line, even if empty
      setCurrentTypedChars(prev => ({ ...prev, [lineToAdd.id]: prev[lineToAdd.id] || '' }));
      setShowCursorForLine(lineToAdd.id);
      const startIndex = currentTypedChars[lineToAdd.id]?.length || 0;
      
      typingTimeoutRef.current = window.setTimeout(() => {
        if (isCyclingRef.current && isMountedRef.current) {
          typeCharacter(lineToAdd, startIndex);
        } else {
          setShowCursorForLine(null);
        }
      }, SCRIPT_LINE_DELAY / 2);
    } else {
      // Non-typed line or output line, just advance
      lineAdvanceTimeoutRef.current = window.setTimeout(() => {
        if (isCyclingRef.current && isMountedRef.current) {
          setCurrentLineInScript(prev => prev + 1);
        }
      }, SCRIPT_LINE_DELAY);
    }
  // Main effect dependencies:
  // currentTypedChars is intentionally omitted to prevent re-triggering typing for same line.
  // Typing resume logic relies on startIndex calculated from currentTypedChars within the timeout.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScriptIndex, currentLineInScript, isCycling, typeCharacter, clearAllPendingTimeouts]);


  useEffect(() => {
    const lastLine = displayedLines[displayedLines.length - 1];
    if (lastLine && lastLine.type === 'clear') {
      // Small delay to allow the 'clear' action to be "visible" before lines are actually removed
      const clearDisplayTimeout = setTimeout(() => {
        if (isMountedRef.current) {
          setDisplayedLines([]);
        }
      }, 50);
      return () => clearTimeout(clearDisplayTimeout);
    }
  }, [displayedLines]);

  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [displayedLines, currentTypedChars]);

  const lastVisibleLine = displayedLines[displayedLines.length - 1];
  const currentScriptForFinalPrompt = scripts[currentScriptIndex];
  // Show cursor on final prompt if cycling, script ended, and no command is currently typing
  const showFinalPromptCursor = isCycling && lastVisibleLine && lastVisibleLine.type === 'prompt' && !showCursorForLine && currentScriptForFinalPrompt && currentLineInScript >= currentScriptForFinalPrompt.length;


  return (
    <section id="terminal-effect" className="py-16 bg-transparent text-text-off-white font-['Source_Code_Pro',_monospace]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="terminal-window-frame bg-base-dark/80 backdrop-blur-md rounded-lg shadow-2xl max-w-4xl mx-auto border border-gray-700/70"
          style={{ boxShadow: '0 0 40px rgba(0, 229, 255, 0.25), 0 0 20px rgba(0, 255, 170, 0.15) inset', position: 'relative', zIndex: 1 }}
          onClick={() => setIsCycling(prev => !prev)}
          aria-label="Terminal animation showcasing various commands and outputs. Click to pause or resume."
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsCycling(prev => !prev);}}
        >
          <div className="terminal-title-bar bg-gray-800/80 px-4 py-2 flex items-center rounded-t-lg border-b border-gray-700/50">
            <div className="flex space-x-2 mr-3">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <div className="text-xs text-gray-300 font-semibold truncate">{terminalTitle}</div>
          </div>

          <div
            ref={terminalContentRef}
            className="terminal-content-area p-4 sm:p-6 min-h-[400px] overflow-y-auto custom-scrollbar"
            role="log"
            aria-live="polite"
            aria-atomic="true"
          >
            {displayedLines.filter(line => line.type !== 'clear').map((line) => (
              <div key={line.id} className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                {line.type === 'prompt' && <span className="text-accent-green" aria-hidden="true">{line.text}</span>}
                {line.type === 'command' && (
                  // Use a unique key for the span if line.id is reused for prompt then command.
                  // However, TerminalLine objects have unique IDs.
                  <span id={`line-${line.id}-typed-span`} className="text-accent-blue">{currentTypedChars[line.id] ?? (line.isTyped ? '' : line.text)}</span>
                )}
                {line.type === 'command' && showCursorForLine === line.id && <span className="typed-cursor-blink" aria-hidden="true"></span>}
                {line.type === 'output' && <span className="text-gray-300">{line.text}</span>}
                {line.type === 'empty' && <span>&nbsp;</span>}
              </div>
            ))}
            {showFinalPromptCursor && currentScriptForFinalPrompt && (
              <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                  <span className="text-accent-green" aria-hidden="true">{currentScriptForFinalPrompt[currentScriptForFinalPrompt.length -1]?.text || 'M.Salman@portfolio:~$ '}</span>
                  <span className="typed-cursor-blink" aria-hidden="true"></span>
              </div>
            )}
            {!isCycling && <div className="text-center text-yellow-400 p-2 mt-2" role="status">Animation Paused. Click Terminal to Resume.</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalEffect;
