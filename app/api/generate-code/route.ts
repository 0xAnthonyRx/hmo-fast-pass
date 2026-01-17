// app/api/generate-code/route.ts
import { NextResponse } from 'next/server';
import { PATIENTS } from '../../../lib/patients'; // Relative path since we aren't using aliases

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, treatmentType, hospitalName } = body;

    // 1. Simulate Network Delay (Make it look like it's "thinking")
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 2. Validate Input
    if (!patientId || !treatmentType || !hospitalName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Check "Database"
    const patient = PATIENTS.find((p) => p.id === patientId);

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient ID not found in HMO Database.' },
        { status: 404 }
      );
    }

    if (patient.status !== 'Active') {
      return NextResponse.json(
        { error: `Patient status is ${patient.status}. Authorization Denied.` },
        { status: 403 }
      );
    }

    // 4. Generate "Thin Air" Code
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const authCode = `AUTH-${randomNum}`;

    // 5. Return Success
    return NextResponse.json({
      success: true,
      data: {
        code: authCode,
        patientName: patient.name,
        hmo: patient.hmo,
        plan: patient.plan,
        treatment: treatmentType,
        timestamp: new Date().toISOString(),
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}