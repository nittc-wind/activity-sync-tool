import { auth } from "@/auth"
import { calendar_v3, google } from "googleapis"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({
      error: "Unauthorized"
    },{
      status: 401
    })
  }

  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({access_token: session?.accessToken})

  const calendar: calendar_v3.Calendar = google.calendar({
    version: "v3",
    auth: oauth2Client
  })
  const calendarResponse = await calendar.calendarList.list()

  console.log(calendarResponse.data)
  return NextResponse.json(
    calendarResponse.data,
  )
}
