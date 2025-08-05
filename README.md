
## 📘 README.md – Serverless Note-Taking API with AWS CDK & TypeScript

> A beginner-friendly project to learn Infrastructure as Code (IaC) with AWS CDK.
> Build a fully serverless API using **Lambda**, **DynamoDB**, **API Gateway**, and **CDK in TypeScript**.

---

## 📌 Features

* ✅ Serverless REST API using AWS Lambda & API Gateway
* 📦 Data persistence with DynamoDB
* 🧾 CRUD operations: Create, Read, Read One, Delete
* 🛠 Infrastructure as Code with AWS CDK
* 🔐 IAM permissions managed by CDK
* ⚡ Written entirely in TypeScript

---

## 🛠 Prerequisites

Before you begin, make sure you have:

| Tool        | Version (or later) | Installation Guide                                                                 |
| ----------- | ------------------ | ---------------------------------------------------------------------------------- |
| Node.js     | `v18.x`            | [https://nodejs.org](https://nodejs.org)                                           |
| AWS CLI     | `v2.x`             | [https://docs.aws.amazon.com/cli/latest/](https://docs.aws.amazon.com/cli/latest/) |
| AWS CDK CLI | `v2.x`             | `npm install -g aws-cdk`                                                           |
| AWS Account | ✅ Required         | [https://aws.amazon.com](https://aws.amazon.com)                                   |
| TypeScript  | `^5.x`             | `npm install -g typescript`                                                        |

> ✅ Make sure you've run `aws configure` to set up your credentials.

---

## 📁 Project Structure

```
note-api-cdk/
├── bin/
│   └── note-api-cdk.ts           # CDK App Entry
├── lib/
│   └── note-api-cdk-stack.ts     # CDK Infrastructure Stack
├── lambda/
│   └── notes.ts                  # Lambda handler (CRUD logic)
├── package.json
├── tsconfig.json
└── cdk.json
```

---

## ⚙️ Setup & Installation

1. **Clone the repo (or initialize CDK app)**

```bash
npx cdk init app --language typescript
```

2. **Install required dependencies**

```bash
npm install @aws-cdk/aws-lambda @aws-cdk/aws-dynamodb @aws-cdk/aws-apigateway @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb uuid
```

3. **Write Lambda logic**

* Create `lambda/notes.ts` file for your CRUD operations.
* Connect it to DynamoDB using AWS SDK v3.

4. **Define infrastructure in CDK stack (`lib/note-api-cdk-stack.ts`)**

* Add: DynamoDB table, Lambda function, API Gateway endpoints
* Grant permissions and set environment variables

5. **Build your CDK app**

```bash
npm run build
```

---

## 🚀 Deploy to AWS

```bash
cdk synth    # Generate CloudFormation template
cdk deploy   # Deploy all resources to AWS
```

You'll get output like:

```
Outputs:
NotesApiEndpoint = https://xyz123.execute-api.us-east-1.amazonaws.com/prod
```

---

## 📫 API Usage (CRUD)

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | `/notes`      | Create a new note   |
| GET    | `/notes`      | Get all notes       |
| GET    | `/notes/{id}` | Get a note by ID    |
| DELETE | `/notes/{id}` | Delete a note by ID |

### 🔤 Sample Request: Create Note

**POST /notes**

```json
{
  "title": "My First Note",
  "content": "Hello AWS CDK!"
}
```

> ⚠️ Make sure to set `Content-Type: application/json` in headers.

---

## 🧠 Concepts Covered

* AWS CDK & Infrastructure as Code (IaC)
* Lambda Functions (Node.js + TypeScript)
* REST API with API Gateway
* DynamoDB NoSQL data modeling
* IAM Roles & Permissions
* Environment Variables
* CloudWatch for Logs
* Clean code structure for scalability

---

## 🔍 Debugging & Logs

Check errors in **CloudWatch**:

* Go to AWS Console → CloudWatch → Logs
* Look for `/aws/lambda/{your-function-name}`

Add error logs in `notes.ts`:

```ts
console.error("❌ Error:", err);
```

---

## 🧹 Cleanup Resources

To delete all resources:

```bash
cdk destroy
```

> ⚠️ This will delete your Lambda, API Gateway, DynamoDB table, and other associated resources.

---

## 🏁 What's Next?

* Add **API Key authentication**
* Add **PUT /notes/{id}** to update notes
* Create a **frontend in HTML/React** and deploy with S3
* Connect to **SNS** or **SES** for notifications
* Add **unit tests** for Lambda

---

## 🤝 Contributing

This is a learning project for educational purposes. Feel free to fork and modify!

---

## 📜 License

MIT – Free for personal or commercial use.

---
