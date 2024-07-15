import { NextRequest, NextResponse } from "next/server";


export default async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname === '/') {
        console.log("Hello! you are being noticed!")

    }

    try {

    } catch (e) {
        //fail silently
        console.error(e)

    }

    return NextResponse.next()
}

export const matcher = {
    //every entry to home page will be noticed!
    matcher: ['/']
}

