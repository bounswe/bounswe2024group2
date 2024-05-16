import requests
import os
import time

class TMDB:

    def __init__(self):
        self.api_key = os.getenv("TMDB_API_KEY")
        # store last 50 request times
        self.request_times = []
        self.rate_limit = int(os.getenv("TMDB_RATE_LIMIT"))
        self.rate_limit_wait = 1

    def send_request(self, url):

        response = requests.get(url)
        self.request_times.append(time.time())
        if len(self.request_times) > self.rate_limit:
            self.request_times.pop(0)
        
        if len(self.request_times) == self.rate_limit:
            time_diff = self.request_times[-1] - self.request_times[0]
            if time_diff < 10:
                print("Rate limit exceeded. Waiting for rate limit.")
                time.sleep(self.rate_limit_wait)
                return self.send_request(url)

        if response.status_code == 200:
            return response.json()
        if response.status_code == 429:
            print("Rate limit exceeded. Waiting for rate limit.")
            time.sleep(self.rate_limit_wait)
            return self.send_request(url)

        else:
            return None


    def get_movie_poster(self, tmdb_id):
        url = f"https://api.themoviedb.org/3/movie/{tmdb_id}?api_key={self.api_key}"
        data = self.send_request(url)
        if data:
            if 'poster_path' in data:
                base_url = "https://image.tmdb.org/t/p/w500"
                return base_url + data['poster_path']
            else:
                return "Poster not found."
        else:
            return "Error: Could not fetch poster."

