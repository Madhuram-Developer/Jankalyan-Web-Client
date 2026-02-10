import { NextRequest, NextResponse } from 'next/server'

function isTokenExpired(token: string): boolean {
    
    try {
        const payload = token.split('.')[1]
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
        const exp = decoded.exp
        return Date.now() / 1000 > exp
    } catch {
        return true 
    }
}

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value
    console.log(token)
    if (!token || isTokenExpired(token)) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!auth|_next/static|_next/image|favicon.ico|png|images).*)',
    ],
}
