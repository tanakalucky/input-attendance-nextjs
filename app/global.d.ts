declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXTAUTH_SECRET: string;
    readonly NEXTAUTH_URL: string;
    readonly COGNITO_REGION: string;
    readonly COGNITO_USER_POOL_ID: string;
    readonly COGNITO_CLIENT_ID: string;
    readonly COGNITO_CLIENT_SECRET: string;
    readonly COGNITO_ISSUER: string;
    readonly NEXT_PUBLIC_GRAPHQL_URL: string;
  }
}
