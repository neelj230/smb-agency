#!/bin/bash
# Overnight batch site builder
# Usage: ./scripts/batch-overnight.sh [max_sites]
# Runs the batch-build command via Claude Code in auto-accept mode
#
# Before running:
#   1. Make sure you're in the smb-agency directory
#   2. caffeinate -s is recommended to prevent sleep
#   3. Run in tmux/screen so it survives terminal closure
#
# This script:
#   - Prevents your Mac from sleeping
#   - Runs Claude Code with the /batch-build command
#   - Logs everything to data/batch-run.log
#   - Commits progress periodically

set -e

MAX_SITES="${1:-58}"
LOG_FILE="data/batch-run.log"
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')

echo "========================================" | tee -a "$LOG_FILE"
echo "Batch run started: $TIMESTAMP" | tee -a "$LOG_FILE"
echo "Max sites: $MAX_SITES" | tee -a "$LOG_FILE"
echo "========================================" | tee -a "$LOG_FILE"

# Run Claude Code with the batch-build command
# --yes auto-accepts tool calls, --max-turns keeps it going
claude --yes \
  --max-turns 500 \
  "/batch-build $MAX_SITES" \
  2>&1 | tee -a "$LOG_FILE"

echo "" | tee -a "$LOG_FILE"
echo "Batch run completed: $(date '+%Y-%m-%d_%H-%M-%S')" | tee -a "$LOG_FILE"

# Final commit of any remaining work
git add -A && git commit -m "Batch build complete: $(date '+%Y-%m-%d')" || true
