+++
title = "How to Backup Kubernetes Clusters Using Velero"
date = "2025-05-13T12:00:00+02:00"
draft = false
tags = ["Kubernetes", "Velero", "Backup", "DevOps"]
+++

## How I Back Up Kubernetes Clusters Using Velero

When working with production-grade Kubernetes clusters, one thing I’ve learned the hard way is this: **“Backups are boring... until you need them.”**  
So, let me walk you through how I handle backups using a tool I trust — **Velero**.

### 🛠️ What is Velero?

Velero is an open-source tool that lets you **back up and restore Kubernetes resources and persistent volumes**. Think of it as Time Machine for your Kubernetes cluster.

### 🚀 My Use Case

In my previous role, I was responsible for managing Kubernetes clusters for healthcare applications on GCP. Losing even a ConfigMap or secret could create serious impact. We needed a reliable, cloud-native backup strategy that was easy to restore from.

### 💡 Why I Chose Velero

- It supports **backing up both resources and volumes**
- Integrates smoothly with cloud storage like AWS S3 or GCS
- Can schedule backups (like cron jobs)
- Restores entire namespaces or just specific components

### 🔧 How to Install and Use Velero (5 Easy Steps)

1. **Install Velero CLI**

```bash
brew install velero
```

2. **Create a GCS backup bucket**

```bash
gsutil mb -l europe-west3 gs://your-cluster-backup
```

3. **Install Velero into your cluster**

```bash
velero install \
  --provider gcp \
  --plugins velero/velero-plugin-for-gcp:v1.5.0 \
  --bucket your-cluster-backup \
  --backup-location-config serviceAccount=velero-sa.json \
  --use-restic
```

4. **Take a Backup**

```bash
velero backup create daily-backup --include-namespaces=prod
```

5. **Restore a Backup**

```bash
velero restore create --from-backup daily-backup
```

### 🧠 Pro Tips

- Always **test restores**
- Use `restic` if you rely on PVCs
- Schedule backups with cron:

```bash
velero schedule create daily-prod --schedule="0 0 * * *" --include-namespaces=prod
```