+++
title = "Wie man Kubernetes-Cluster mit Velero sichert"
date = "2025-05-13T12:00:00+02:00"
draft = false
tags = ["Kubernetes", "Velero", "Backup", "DevOps"]
+++

## Wie ich Kubernetes-Backups mit Velero erstelle

Wenn man mit Kubernetes im Produktivbetrieb arbeitet, habe ich eines gelernt:  
**„Backups sind langweilig... bis man sie wirklich braucht.“**

### 🛠️ Was ist Velero?

Velero ist ein Open-Source-Tool, mit dem man **Kubernetes-Ressourcen und Volumes sichern und wiederherstellen** kann. Stell dir vor, es ist wie ein „Time Machine“ für deinen Cluster.

### 🚀 Mein Anwendungsfall

In meiner früheren Position war ich für Kubernetes-Cluster im Gesundheitsbereich zuständig. Wenn ein ConfigMap oder Secret verloren ging, hatte das direkte Auswirkungen.

### 💡 Warum Velero?

- Unterstützt Ressourcen **und** Volumes
- Funktioniert mit AWS S3, GCS etc.
- Kann geplante Backups machen (Cron)
- Ermöglicht Wiederherstellungen auf Namespace-Ebene

### 🔧 So richtest du Velero ein (5 einfache Schritte)

1. **Velero CLI installieren**

```bash
brew install velero
```

2. **Backup-Bucket erstellen**

```bash
gsutil mb -l europe-west3 gs://dein-k8s-backup
```

3. **Velero im Cluster installieren**

```bash
velero install \
  --provider gcp \
  --plugins velero/velero-plugin-for-gcp:v1.5.0 \
  --bucket dein-k8s-backup \
  --backup-location-config serviceAccount=velero-sa.json \
  --use-restic
```

4. **Backup erstellen**

```bash
velero backup create taeglich-backup --include-namespaces=prod
```

5. **Backup wiederherstellen**

```bash
velero restore create --from-backup taeglich-backup
```

### 🧠 Tipps aus der Praxis

- **Teste Wiederherstellungen regelmäßig**
- Nutze `restic` für PVCs
- Automatisiere Backups mit Cron:

```bash
velero schedule create taeglich-prod --schedule="0 0 * * *" --include-namespaces=prod
```