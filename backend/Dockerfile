FROM python:3.12-alpine

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# Build psycopg2-binary from source -- add required required dependencies
RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
        pip install --no-cache-dir -r requirements.txt && \
        apk --purge del .build-deps

COPY . /app/backend/

# Expose port 8000 to the outside world
EXPOSE 8000

# Define the volume mount point
VOLUME /app/backend/data

CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]