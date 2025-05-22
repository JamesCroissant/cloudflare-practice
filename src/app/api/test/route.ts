import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";

export async function GET() {
  // getCloudflareContext() の呼び出しをGET関数内に移動
  const { env } = await getCloudflareContext();

  console.log('env object:', env); // envオブジェクト全体をログに出力


  return NextResponse.json({
    SECRET_KEY: `value: ${env.TEST_SECRET_KEY}`,
    NEXTJS_ENV: `value: ${env.NEXTJS_ENV}`,
    TEST: `value: ${env.TEST_SECRET_KEY || 'Not set'}` // TESTがundefinedの場合のフォールバック
  });
}