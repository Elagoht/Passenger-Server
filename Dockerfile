FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir build

RUN chmod +x /app/app/passenger

RUN python -m build --wheel

RUN pip install --no-cache-dir dist/*.whl

RUN pip install gunicorn

RUN touch /app/passenger.bus && chmod 777 /app/passenger.bus

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:9854", "run:app"]
