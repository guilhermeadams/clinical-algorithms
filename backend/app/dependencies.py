from fastapi import HTTPException, Request


async def get_token_header(request: Request):
    token = request.headers.get('token')

    if token != "89745cfd55cf9181b253981a65dbafe7":
        raise HTTPException(status_code=400, detail="X-Token header invalid")
