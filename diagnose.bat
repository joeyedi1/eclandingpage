@echo off
echo GIT STATUS: > diagnose_log.txt
git status >> diagnose_log.txt 2>&1
echo. >> diagnose_log.txt
echo GIT CONFIG: >> diagnose_log.txt
git config --list >> diagnose_log.txt 2>&1
