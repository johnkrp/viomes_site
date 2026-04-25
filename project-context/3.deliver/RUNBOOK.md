# Runbook & Operations - VIOMES

**Project**: VIOMES S.A. Homepage  
**Owner**: `@devops-eng` + On-call  
**Last Updated**: April 2026

---

## Common Issues & Solutions

### Issue: High Page Load Time

**Symptoms**: Lighthouse score drops below 80  
**Root Causes**: Image optimization loss, code bundle bloat, cache issues  
**Solution**:

1. Check bundle size: `npm run build`
2. Analyze with bundle analyzer
3. Clear CDN cache
4. Optimize images if needed

### Issue: Website Down / 500 Errors

**Symptoms**: Site not loading, error spike in Sentry  
**Root Causes**: Deployment failure, database connection lost, memory leak  
**Solution**:

1. Check deployment status
2. Review error logs in Sentry
3. If critical: Rollback last deployment
4. Notify team and escalate

### Issue: Mobile Layout Breaking

**Symptoms**: User reports, responsive design test fails  
**Root Causes**: CSS regression, viewport meta tag issue  
**Solution**:

1. Test on actual mobile device
2. Check browser console for CSS errors
3. Review recent CSS changes via Git
4. Fix and deploy patch

## Regular Maintenance

### Daily

- [ ] Check uptime monitoring status
- [ ] Review error alerts in Sentry
- [ ] Monitor performance metrics

### Weekly

- [ ] Review GitHub Actions CI/CD logs
- [ ] Check dependency updates security alerts
- [ ] Verify backup procedures (if applicable)

### Monthly

- [ ] Update dependencies (npm audit)
- [ ] Review monitoring dashboards
- [ ] Accessibility audit spot check
- [ ] Performance audit spot check

## On-Call Procedures

### Escalation Contacts

| Level | Contact             | Response Time |
| ----- | ------------------- | ------------- |
| L1    | [Frontend Engineer] | 30 min        |
| L2    | [DevOps Engineer]   | 1 hour        |
| L3    | [CTO / Architect]   | 2 hours       |

### Critical Issue Process

1. Alert triggered → Slack notification
2. L1 acknowledges and assesses
3. If urgent: Start mitigation
4. If blocking: Escalate to L2
5. Post-incident review within 24 hours

### Incident Severity Levels

- **CRITICAL**: Site down, data loss, security breach → Immediate action
- **HIGH**: Performance <1.5s LCP, errors >1% → Within 30 min
- **MEDIUM**: Performance degradation, non-critical feature broken → Within 2 hours
- **LOW**: Minor UI issues, documentation gaps → Schedule for next release

## Deployment & Rollback

### Safe Deployment Checklist

- [ ] All tests passing in CI/CD
- [ ] Code reviewed and approved
- [ ] Staging deployment validated
- [ ] Performance not regressed
- [ ] No database migrations (unless tested)

### Rollback Procedure

1. Identify faulty deployment
2. Retrieve previous stable version
3. `git revert [commit]` or manual rollback
4. Run full test suite
5. Deploy to staging first
6. Verify performance & functionality
7. Release to production
8. Monitor error rates for 1 hour

## Backup & Recovery

_To be filled based on hosting provider (Vercel, Netlify, etc.)_

- [ ] Backup strategy documented
- [ ] Recovery procedure tested
- [ ] RTO/RPO targets defined

---

## Sign-Off

- [ ] Runbook complete
- [ ] Team trained
- [ ] On-call procedures practiced
