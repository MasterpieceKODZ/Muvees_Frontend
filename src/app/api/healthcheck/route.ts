import { NextResponse } from "next/server";

export async function GET() {
	console.log("I got the message");
	return NextResponse.json("This is my response to you");
}
