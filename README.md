# DevOps Toolchain Cheat Sheet

A quick, practical reference guide for essential DevOps tools, covering installation and daily commands.

## Table of Contents
- [🐧 Linux (Ubuntu/CentOS)](#-linux-ubuntucentos)
- [🐙 Git & GitHub](#-git--github)
- [🐳 Docker](#-docker)
- [☸️ Kubernetes](#️-kubernetes)
- [🛎️ Jenkins](#️-jenkins)
- [🏗️ Terraform](#️-terraform)
- [☁️ AWS CLI](#️-aws-cli)
- [📊 Prometheus & Grafana](#-prometheus--grafana)
- [🟢 Node.js & NPM](#-nodejs--npm)

---

## 🐧 Linux (Ubuntu/CentOS)
**What is it?** The foundational operating system and command-line interface for most DevOps infrastructure.  
**When to use it?**
- Managing servers, file permissions, and system processes.
- Writing Bash scripts for automation.

**Installation (Ubuntu/Linux):**
*(Linux is typically pre-installed on servers, but here's how to ensure basic utilities are present)*
```bash
sudo apt-get update -y
```

```bash
sudo apt-get install -y curl wget vim build-essential
```

**Cheatsheet / Common Commands:**
```bash
# System Information
# View system information
uname -a
```

```bash
# Interactive process viewer (install via apt)
htop
```

```bash
# Check disk space in human-readable format
df -h
```

```bash
# Check memory usage in MB
free -m
```

```bash
# File Operations
# List all files with detailed info
ls -lah
```

```bash
# Make a built script executable
chmod 755 script.sh
```

```bash
# Change file owner and group
chown user:group file
```

```bash
# Compress directory into tarball
tar -czvf flag.tar.gz /dir
```

```bash
# Network
# Check network connectivity
ping google.com
```

```bash
# List listening ports
netstat -tulpn
```

```bash
# Fetch HTTP headers from a URL
curl -I https://url
```

```bash
# Bash Scripting Basics
# Shebang for bash scripts
#!/bin/bash
```

```bash
# Positional arguments passed to script
$1, $2
```

```bash
# Exit status of the last command
$?
```

---

## 🐙 Git & GitHub
**What is it?** A distributed version control system and collaboration platform for source code.  
**When to use it?**
- Tracking code changes across teams.
- Triggering CI/CD pipelines upon push or merge.

**Installation (Ubuntu/Linux):**
```bash
sudo apt-get update
```

```bash
sudo apt-get install -y git
```

```bash
git --version
```

**Cheatsheet / Common Commands:**
```bash
# Configuration
git config --global user.name "Your Name"
```

```bash
git config --global user.email "you@example.com"
```

```bash
# Repository Operations
# Initialize a new local repo
git init
```

```bash
# Clone a remote repo
git clone <url>
```

```bash
# Daily Workflow
# Check modified files
git status
```

```bash
# Stage all changes
git add .
```

```bash
# Commit changes with a message
git commit -m "feat: add feature"
```

```bash
# Push changes to remote main branch
git push origin main
```

```bash
# Fetch and merge remote changes
git pull origin main
```

```bash
# Branching
# List local branches
git branch
```

```bash
# Create and switch to a new branch
git checkout -b <branch-name>
```

```bash
# Merge branch into current branch
git merge <branch-name>
```

---

## 🐳 Docker
**What is it?** A platform for developing, shipping, and running applications in isolated containers.  
**When to use it?**
- Packaging applications with their dependencies.
- Ensuring consistency across Dev, Test, and Prod environments.

**Installation (Ubuntu/Linux):**
```bash
# Add Docker's official GPG key and repo, then install
sudo apt-get update
```

```bash
sudo apt-get install -y ca-certificates curl
```

```bash
sudo install -m 0755 -d /etc/apt/keyrings
```

```bash
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
```

```bash
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
sudo apt-get update
```

```bash
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```bash
# Manage Docker as a non-root user
sudo usermod -aG docker $USER && newgrp docker
```

**Cheatsheet / Common Commands:**
```bash
# Image Management
# Build an image from Dockerfile
docker build -t app:v1 .
```

```bash
# Download an image from Docker Hub
docker pull nginx:latest
```

```bash
# List local images
docker images
```

```bash
# Container Operations
# Run container in background, map port
docker run -d -p 8080:80 app:v1
```

```bash
# List running containers
docker ps
```

```bash
# List all containers (running and stopped)
docker ps -a
```

```bash
# Stop a container
docker stop <container_id>
```

```bash
# Remove a container
docker rm <container_id>
```

```bash
# View container logs
docker logs <container_id>
```

```bash
# Open shell inside a running container
docker exec -it <container_id> sh
```

```bash
# Cleanup
# Remove unused data (containers, images)
docker system prune -a
```

---

## ☸️ Kubernetes
**What is it?** An open-source container orchestration system for automating application deployment, scaling, and management.  
**When to use it?**
- Managing large-scale distributed microservices.
- Providing high availability and auto-scaling.

**Installation (Ubuntu/Linux - kubectl & Kind):**
```bash
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

```bash
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

```bash
kubectl version --client
```

```bash
# Install Kind (Kubernetes in Docker)
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
```

```bash
chmod +x ./kind
```

```bash
sudo mv ./kind /usr/local/bin/kind
```

```bash
kind version
```

**Cheatsheet / Common Commands:**
```bash
# Basic Resources
# List cluster nodes
kubectl get nodes
```

```bash
# List pods in all namespaces
kubectl get pods -A
```

```bash
# List services and deployments
kubectl get svc,deploy
```

```bash
# Applying & Inspecting Resources
# Create/update resource from file
kubectl apply -f manifest.yaml
```

```bash
# Show detailed info about a pod
kubectl describe pod <pod_name>
```

```bash
# View logs of a pod
kubectl logs <pod_name>
```

```bash
# Execute shell in a pod
kubectl exec -it <pod_name> -- sh
```

```bash
# Operations
# Scale a deployment
kubectl scale deploy <name> --replicas=3
```

```bash
# Map local port to service
kubectl port-forward svc/<svc> 8080:80
```

```bash
# Delete a pod (will respawn if managed)
kubectl delete pod <pod_name>
```

```bash
# View cluster events
kubectl get events --sort-by=.metadata.creationTimestamp
```

---

## 🛎️ Jenkins
**What is it?** An open-source automation server used to build, test, and deploy software in CI/CD pipelines.  
**When to use it?**
- Automating testing and builds upon source code changes.
- Orchestrating complex deployment workflows.

**Installation (Ubuntu/Linux):**
```bash
sudo apt-get update
```

```bash
sudo apt-get install -y fontconfig openjdk-17-jre
```

```bash
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
```

```bash
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
```

```bash
sudo apt-get update
```

```bash
sudo apt-get install -y jenkins
```

```bash
sudo systemctl enable --now jenkins
```

**Cheatsheet / Common Commands:**
```bash
# Service Management
sudo systemctl status jenkins      # Check Jenkins status
sudo cat /var/lib/jenkins/secrets/initialAdminPassword # Get initial password

# Jenkinsfile Pipeline Example Components
# pipeline {
#   agent any
#   stages {
#     stage('Build') {
#       steps { sh 'npm install' }
#     }
#     stage('Test') {
#       steps { sh 'npm test' }
#     }
#   }
# }
```

---

## 🏗️ Terraform
**What is it?** An infrastructure as code (IaC) tool to provision and manage cloud resources declaratively.  
**When to use it?**
- Automating the creation of AWS/GCP/Azure resources (VPCs, EC2s, RDS).
- Maintaining version-controlled infrastructure configurations.

**Installation (Ubuntu/Linux):**
```bash
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
```

```bash
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
```

```bash
sudo apt-get update && sudo apt-get install terraform
```

**Cheatsheet / Common Commands:**
```bash
# Core Workflow
# Initialize working directory (download providers)
terraform init
```

```bash
# Format configuration files automatically
terraform fmt
```

```bash
# Check syntax and validity of files
terraform validate
```

```bash
# Show execution plan (dry run)
terraform plan
```

```bash
# Apply changes to actual infrastructure
terraform apply
```

```bash
# Apply without prompt (dangerous in prod)
terraform apply -auto-approve
```

```bash
# Destroy all managed infrastructure
terraform destroy
```

```bash
# State Management
# List resources in the state file
terraform state list
```

```bash
# Inspect the current state
terraform show
```

---

## ☁️ AWS CLI
**What is it?** A unified command-line tool to manage Amazon Web Services interactively or via scripts.  
**When to use it?**
- Automating AWS tasks outside of Terraform.
- Quickly querying resource statuses (e.g., S3 bucket contents).

**Installation (Ubuntu/Linux):**
```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
```

```bash
sudo apt-get install -y unzip
```

```bash
unzip awscliv2.zip
```

```bash
sudo ./aws/install
```

```bash
aws --version
```

**Cheatsheet / Common Commands:**
```bash
# Configuration
# Set up credentials and default region
aws configure
```

```bash
# STS & IAM
# Verify who you are logged in as
aws sts get-caller-identity
```

```bash
# List IAM users
aws iam list-users
```

```bash
# EC2
# List EC2 instances
aws ec2 describe-instances
```

```bash
# Start an instance
aws ec2 start-instances --instance-ids i-12345
```

```bash
# S3
# List buckets
aws s3 ls
```

```bash
# List objects in a bucket
aws s3 ls s3://my-bucket
```

```bash
# Upload a file
aws s3 cp file.txt s3://my-bucket
```

```bash
# Sync directory to bucket
aws s3 sync local_dir s3://my-bucket
```

```bash
# EKS Commands
# Configure kubectl for EKS
aws eks update-kubeconfig --region us-east-1 --name cluster-name
```

```bash
# List all EKS clusters in a region
aws eks list-clusters --region us-east-1
```

```bash
# Get details of a specific cluster
aws eks describe-cluster --name cluster-name
```

```bash
# Update cluster K8s version
aws eks update-cluster-version --name cluster-name --kubernetes-version 1.28
```

---

## 📊 Prometheus & Grafana
**What is it?** Prometheus is a metrics-based monitoring alert system; Grafana is a visualization platform for those metrics.  
**When to use it?**
- Scraping performance metrics from application endpoints/servers.
- Creating visual dashboards for infrastructure health.

**Installation (Ubuntu/Linux) - via Curl (Binaries from GitHub/Official Release):**
```bash
# 1. Download and start Prometheus
curl -LO https://github.com/prometheus/prometheus/releases/download/v2.45.0/prometheus-2.45.0.linux-amd64.tar.gz
```

```bash
tar -xvf prometheus-2.45.0.linux-amd64.tar.gz
```

```bash
cd prometheus-2.45.0.linux-amd64
```

```bash
./prometheus --config.file=prometheus.yml &
```

```bash
# 2. Download and start Grafana
curl -LO https://dl.grafana.com/oss/release/grafana-10.4.0.linux-amd64.tar.gz
```

```bash
tar -zxvf grafana-10.4.0.linux-amd64.tar.gz
```

```bash
cd grafana-10.4.0
```

```bash
./bin/grafana-server web &
```

**Alternative Installation - via Docker Compose:**
```bash
# Ensure docker-compose is installed, then run the following in a directory with docker-compose.yml:
# services:
#   prometheus:
#     image: prom/prometheus
#     ports:
#       - 9090:9090
#   grafana:
#     image: grafana/grafana
#     ports:
#       - 3000:3000
docker-compose up -d
```

**Cheatsheet / Common Commands:**
```bash
# PromQL (Prometheus Query Language) Examples
# Check if targets are alive (1=up, 0=down)
up
```

```bash
# Available active memory
node_memory_Active_bytes
```

```bash
# HTTP request rate over the last 5 min
rate(http_requests_total[5m])
```

```bash
# Grafana Operations (Typically GUI based)
# Default Login: admin / admin at http://localhost:3000
# 1. Add Prometheus as Data Source (URL: http://prometheus:9090)
# 2. Import community dashboards (e.g., ID 1860 for Node Exporter)
```

---

## 🟢 Node.js & NPM
**What is it?** A JavaScript runtime built on Chrome's V8 engine, with NPM as its package manager.  
**When to use it?**
- Running server-side JavaScript applications.
- Managing dependencies and build scripts for frontend projects.

**Installation (Ubuntu/Linux):**
```bash
# Install NodeSource PPA and Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
```

```bash
sudo apt-get install -y nodejs
```

```bash
node -v && npm -v
```

**Cheatsheet / Common Commands:**
```bash
# Packages
# Initialize a new package.json
npm init -y
```

```bash
# Install a package & add to pkg config
npm install express
```

```bash
# Install a global package
npm install -g typescript
```

```bash
# Install a dev dependency
npm install --save-dev jest
```

```bash
# Clean install from lockfile (for CI)
npm ci
```

```bash
# Execution
# Run a JavaScript file
node app.js
```

```bash
# Run the start script in package.json
npm start
```

```bash
# Run a custom build script
npm run build
```

```bash
# Execute a package without global install
npx create-react-app my-app
```
