import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(req: Request) {
  const { env } = getCloudflareContext();
  console.log('env', env);

  return Response.json({
    message: `SECRET_KEY: ${env.SECRET_KEY}`,
  });
}
