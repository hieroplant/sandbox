import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from "@/prisma/client";

// Schema for validating actuator creation
const createIssueSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1),
});

// Handler for creating a new actuator
export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const newActuator = await prisma.actuator.create({
        data: {
            name: validation.data.name,
            description: validation.data.description,
        },
    });

    return NextResponse.json(newActuator, { status: 201 });
}

// Handler for fetching all actuators
export async function GET(request: NextRequest) {
    try {
        const actuators = await prisma.actuator.findMany();
        return NextResponse.json(actuators, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to fetch actuators' }, { status: 500 });
    }
}

