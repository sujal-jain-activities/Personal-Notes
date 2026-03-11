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
sudo apt-get install -y curl wget vim build-essential
```

**Cheatsheet / Common Commands:**
```bash
# System Information
uname -a             # View system information
htop                 # Interactive process viewer (install via apt)
df -h                # Check disk space in human-readable format
free -m              # Check memory usage in MB

# File Operations
ls -lah              # List all files with detailed info
chmod 755 script.sh  # Make a built script executable
chown user:group file # Change file owner and group
tar -czvf flag.tar.gz /dir # Compress directory into tarball

# Network
ping google.com      # Check network connectivity
netstat -tulpn       # List listening ports
curl -I https://url  # Fetch HTTP headers from a URL

# Bash Scripting Basics
#!/bin/bash          # Shebang for bash scripts
$1, $2               # Positional arguments passed to script
$?                   # Exit status of the last command
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
sudo apt-get install -y git
git --version
```

**Cheatsheet / Common Commands:**
```bash
# Configuration
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Repository Operations
git init                           # Initialize a new local repo
git clone <url>                    # Clone a remote repo

# Daily Workflow
git status                         # Check modified files
git add .                          # Stage all changes
git commit -m "feat: add feature"  # Commit changes with a message
git push origin main               # Push changes to remote main branch
git pull origin main               # Fetch and merge remote changes

# Branching
git branch                         # List local branches
git checkout -b <branch-name>      # Create and switch to a new branch
git merge <branch-name>            # Merge branch into current branch
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
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Manage Docker as a non-root user
sudo usermod -aG docker $USER && newgrp docker
```

**Cheatsheet / Common Commands:**
```bash
# Image Management
docker build -t app:v1 .           # Build an image from Dockerfile
docker pull nginx:latest           # Download an image from Docker Hub
docker images                      # List local images

# Container Operations
docker run -d -p 8080:80 app:v1    # Run container in background, map port
docker ps                          # List running containers
docker ps -a                       # List all containers (running and stopped)
docker stop <container_id>         # Stop a container
docker rm <container_id>           # Remove a container
docker logs <container_id>         # View container logs
docker exec -it <container_id> sh  # Open shell inside a running container

# Cleanup
docker system prune -a             # Remove unused data (containers, images)
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
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client

# Install Kind (Kubernetes in Docker)
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
kind version
```

**Cheatsheet / Common Commands:**
```bash
# Basic Resources
kubectl get nodes                  # List cluster nodes
kubectl get pods -A                # List pods in all namespaces
kubectl get svc,deploy             # List services and deployments

# Applying & Inspecting Resources
kubectl apply -f manifest.yaml     # Create/update resource from file
kubectl describe pod <pod_name>    # Show detailed info about a pod
kubectl logs <pod_name>            # View logs of a pod
kubectl exec -it <pod_name> -- sh  # Execute shell in a pod

# Operations
kubectl scale deploy <name> --replicas=3 # Scale a deployment
kubectl port-forward svc/<svc> 8080:80   # Map local port to service
kubectl delete pod <pod_name>      # Delete a pod (will respawn if managed)
kubectl get events --sort-by=.metadata.creationTimestamp # View cluster events
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
sudo apt-get install -y fontconfig openjdk-17-jre
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install -y jenkins
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
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt-get update && sudo apt-get install terraform
```

**Cheatsheet / Common Commands:**
```bash
# Core Workflow
terraform init                     # Initialize working directory (download providers)
terraform fmt                      # Format configuration files automatically
terraform validate                 # Check syntax and validity of files
terraform plan                     # Show execution plan (dry run)
terraform apply                    # Apply changes to actual infrastructure
terraform apply -auto-approve      # Apply without prompt (dangerous in prod)
terraform destroy                  # Destroy all managed infrastructure

# State Management
terraform state list               # List resources in the state file
terraform show                     # Inspect the current state
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
sudo apt-get install -y unzip
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

**Cheatsheet / Common Commands:**
```bash
# Configuration
aws configure                      # Set up credentials and default region

# STS & IAM
aws sts get-caller-identity        # Verify who you are logged in as
aws iam list-users                 # List IAM users

# EC2
aws ec2 describe-instances         # List EC2 instances
aws ec2 start-instances --instance-ids i-12345 # Start an instance

# S3
aws s3 ls                          # List buckets
aws s3 ls s3://my-bucket           # List objects in a bucket
aws s3 cp file.txt s3://my-bucket  # Upload a file
aws s3 sync local_dir s3://my-bucket # Sync directory to bucket

# EKS Commands
aws eks update-kubeconfig --region us-east-1 --name cluster-name # Configure kubectl for EKS
aws eks list-clusters --region us-east-1                         # List all EKS clusters in a region
aws eks describe-cluster --name cluster-name                     # Get details of a specific cluster
aws eks update-cluster-version --name cluster-name --kubernetes-version 1.28 # Update cluster K8s version
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
tar -xvf prometheus-2.45.0.linux-amd64.tar.gz
cd prometheus-2.45.0.linux-amd64
./prometheus --config.file=prometheus.yml &

# 2. Download and start Grafana
curl -LO https://dl.grafana.com/oss/release/grafana-10.4.0.linux-amd64.tar.gz
tar -zxvf grafana-10.4.0.linux-amd64.tar.gz
cd grafana-10.4.0
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
up                                 # Check if targets are alive (1=up, 0=down)
node_memory_Active_bytes           # Available active memory
rate(http_requests_total[5m])      # HTTP request rate over the last 5 min

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
sudo apt-get install -y nodejs
node -v && npm -v
```

**Cheatsheet / Common Commands:**
```bash
# Packages
npm init -y                        # Initialize a new package.json
npm install express                # Install a package & add to pkg config
npm install -g typescript          # Install a global package
npm install --save-dev jest        # Install a dev dependency
npm ci                             # Clean install from lockfile (for CI)

# Execution
node app.js                        # Run a JavaScript file
npm start                          # Run the start script in package.json
npm run build                      # Run a custom build script
npx create-react-app my-app        # Execute a package without global install
```
