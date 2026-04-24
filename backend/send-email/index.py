import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def handler(event: dict, context) -> dict:
    """Отправка заявки или письма с сайта на email 5sveteslav5@gmail.com"""

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    try:
        body = json.loads(event.get('body') or '{}')
    except Exception:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Invalid JSON'})}

    mode = body.get('mode', 'form')
    to_email = '5sveteslav5@gmail.com'

    smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.environ.get('SMTP_PORT', 465))
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']

    if mode == 'form':
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        email = body.get('email', '').strip()
        message = body.get('message', '').strip()

        if not name:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Укажите имя'})}

        subject = f'Новая заявка с сайта от {name}'
        html_body = f"""
        <h2>Новая заявка с сайта</h2>
        <p><b>Имя:</b> {name}</p>
        <p><b>Телефон:</b> {phone or 'не указан'}</p>
        <p><b>Email:</b> {email or 'не указан'}</p>
        <p><b>Сообщение:</b><br>{message or 'не указано'}</p>
        """
    elif mode == 'direct':
        sender_name = body.get('name', '').strip()
        sender_email = body.get('from_email', '').strip()
        message = body.get('message', '').strip()

        if not message:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Напишите сообщение'})}

        subject = f'Сообщение с сайта от {sender_name or sender_email or "посетителя"}'
        html_body = f"""
        <h2>Сообщение с сайта</h2>
        <p><b>От кого:</b> {sender_name or 'не указано'}</p>
        <p><b>Email отправителя:</b> {sender_email or 'не указан'}</p>
        <p><b>Сообщение:</b><br>{message}</p>
        """
    else:
        return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Unknown mode'})}

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'success': True, 'message': 'Письмо отправлено'})
    }
