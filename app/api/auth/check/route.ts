import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // التحقق من وجود token في cookies
    const token = request.cookies.get("auth_token")?.value;
    const user = request.cookies.get("auth_user")?.value;

    if (!token || !user) {
      return NextResponse.json({
        isAuthenticated: false,
        user: null,
      });
    }

    // محاولة فك تشفير بيانات المستخدم
    let userData;
    try {
      userData = JSON.parse(user);
    } catch (error) {
      return NextResponse.json({
        isAuthenticated: false,
        user: null,
      });
    }

    // التحقق من وجود البيانات المطلوبة
    if (!userData.id || !userData.name || !userData.email) {
      return NextResponse.json({
        isAuthenticated: false,
        user: null,
      });
    }

    return NextResponse.json({
      isAuthenticated: true,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({
      isAuthenticated: false,
      user: null,
    });
  }
}
