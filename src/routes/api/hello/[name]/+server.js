export function GET(request) {
    const name = request.url.searchParams.get('name') || 'world';
    return new Response(`Hello ${name}!`);
}