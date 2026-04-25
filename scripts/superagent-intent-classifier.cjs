#!/usr/bin/env node

const classifiers = [
  { name: 'ui-ux-pro-max-skill', patterns: [/\bdesign\b/i, /\bui\b/i, /\bcomponent\b/i, /\bcolor palette\b/i, /\btypography\b/i] },
  { name: 'testing-subagent', patterns: [/\btest\b/i, /\bcoverage\b/i, /\bunit\b/i, /\bintegration\b/i, /\be2e\b/i] },
  { name: 'perf-subagent', patterns: [/\bperf\b/i, /\blatency\b/i, /\bttfb\b/i, /\bmemory\b/i, /\bload\b/i] },
  { name: 'security-subagent', patterns: [/\bsecurity\b/i, /\bvuln\b/i, /\bxss\b/i, /\bcsrf\b/i, /\bauth\b/i, /\bsql injection\b/i] },
  { name: 'debugging-subagent', patterns: [/\bdebug\b/i, /\berror\b/i, /\bexception\b/i, /\bcrash\b/i, /\bstack trace\b/i] },
];

function classifyIntent(text) {
  const normalized = text.trim();
  if (!normalized) {
    return { delegate: 'Conductor', reason: 'empty or whitespace input' };
  }

  for (const candidate of classifiers) {
    if (candidate.patterns.some((rx) => rx.test(normalized))) {
      return { delegate: candidate.name, reason: `matched ${candidate.name}` };
    }
  }

  // UI/UX fallback if project has mcp.json
  const fs = require('fs');
  const path = require('path');
  const mcpPath = path.resolve(process.cwd(), '.vscode', 'mcp.json');
  if (fs.existsSync(mcpPath) && /\bdesign\b|\bui\b|\bcomponent\b|\bstyle\b/i.test(normalized)) {
    return { delegate: 'ui-ux-pro-max-skill', reason: 'MCP store present + design intent' };
  }

  return { delegate: 'Conductor', reason: 'no explicit intent matched' };
}

if (require.main === module) {
  const sampleRequests = [
    'Create a responsive dashboard component with color accessible palette',
    'Add unit tests for product filtering',
    'Improve page load performance and reduce TTFB',
    'Audit for XSS and CSRF vulnerabilities',
    'Fix this runtime crash and stack trace in hero carousel',
    'Provide a phase-by-phase plan for v2 release',
  ];

  console.log('Superagent intent classifier (demo)');
  console.log('----------------------------------');
  for (const request of sampleRequests) {
    const result = classifyIntent(request);
    console.log(`\nRequest: ${request}`);
    console.log(`  Delegate: ${result.delegate}`);
    console.log(`  Reason: ${result.reason}`);
  }

  console.log('\nExit code: 0');
  process.exit(0);
}

module.exports = {
  classifyIntent,
};
