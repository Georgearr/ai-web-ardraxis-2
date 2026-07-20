import os
import csv
import json
import time
import logging
from typing import Optional
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from config import Config

logger = logging.getLogger(__name__)


class CSVFileHandler(FileSystemEventHandler):
    def __init__(self, callback):
        self.callback = callback

    def on_modified(self, event):
        if event.src_path.endswith(".csv"):
            logger.info(f"CSV changed: {event.src_path}")
            self.callback()


class CSVService:
    _instance = None
    _cache = {}
    _cache_time = {}
    _observer = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        self._load_all()
        self._start_watcher()

    def _start_watcher(self):
        try:
            if CSVService._observer is None:
                handler = CSVFileHandler(self._invalidate_cache)
                CSVService._observer = Observer()
                CSVService._observer.schedule(handler, Config.CSV_DIR, recursive=False)
                CSVService._observer.start()
                logger.info("CSV file watcher started")
        except Exception as e:
            logger.warning(f"Failed to start file watcher: {e}")

    def _invalidate_cache(self):
        CSVService._cache = {}
        CSVService._cache_time = {}
        logger.info("CSV cache invalidated")

    def _load_csv(self, filename: str) -> list:
        filepath = os.path.join(Config.CSV_DIR, filename)
        if not os.path.exists(filepath):
            logger.warning(f"CSV not found: {filepath}")
            return []
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                return [row for row in reader]
        except Exception as e:
            logger.error(f"Failed to read {filename}: {e}")
            return []

    def _get_csv(self, filename: str) -> list:
        cache_key = filename
        now = time.time()

        if cache_key in CSVService._cache:
            age = now - CSVService._cache_time.get(cache_key, 0)
            if age < Config.MAX_CACHE_AGE:
                return CSVService._cache[cache_key]

        data = self._load_csv(filename)
        CSVService._cache[cache_key] = data
        CSVService._cache_time[cache_key] = now
        return data

    def _load_all(self):
        self._get_csv("members.csv")
        self._get_csv("events.csv")
        self._get_csv("faq.csv")
        self._get_csv("programs.csv")

    def get_members(self) -> list:
        return self._get_csv("members.csv")

    def get_events(self) -> list:
        return self._get_csv("events.csv")

    def get_faq(self) -> list:
        return self._get_csv("faq.csv")

    def get_programs(self) -> list:
        return self._get_csv("programs.csv")
