# HMO Fast-Pass Authorization System

> **Live Demo:** [https://hmo-fast-pass.vercel.app](https://hmo-fast-pass.vercel.app)

## The Problem
In Nigeria, the **National Health Insurance Authority (NHIA)** has mandated that all HMOs must issue authorization codes to hospitals within **1 hour** or face sanctions. Currently, most HMOs rely on manual phone calls and WhatsApp messages, leading to:
- Delays of 3-6 hours for sick patients.
- Frustrated hospital staff.
- Risk of heavy government fines.

## The Solution
**HMO Fast-Pass** is an automated gatekeeper system that reduces authorization time from **hours to 60 seconds**.

It allows hospitals to submit patient details via a secure portal, instantly validates eligibility against the HMO's database, and generates a unique, trackable authorization code.

## Key Features (Prototype)
- **Instant Eligibility Check:** Validates Patient ID against active enrollee lists.
- **Smart Validation:** Checks if the requested treatment is covered by the patient's specific plan.
- **Code Generation:** Issues unique, fraud-proof authorization codes (e.g., `AUTH-847291`).
- **Mobile Optimized:** Designed for hospital staff using mobile phones in low-bandwidth environments.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** Vercel

## Screenshots
*()*

##  How to Run Locally

1. **Clone the repository**
   ```bash
   git clone [https://github.com/0xAnthonyRx/hmo-fast-pass.git](https://github.com/0xAnthonyRx/hmo-fast-pass.git)
   cd hmo-fast-pass


   Install dependencies
   npm install
   Run the development server
   npm run dev
   Open your browser Navigate to http://localhost:3000



## Testing Data

To test the prototype logic, use these IDs:

12345 - Active Patient (Gold Plan) -> Success

11111 - Suspended Patient -> Fails

99999 - Non-existent ID -> Fails

## Future Roadmap (Pilot Phase)
[ ] Integration with Termii API for SMS delivery.

[ ] PostgreSQL Database connection for real-time enrollee management.

[ ] Admin Dashboard for HMO Operations Managers.

# Built by Anthony Madu, Solving Healthcare Logistics in Nigeria.
