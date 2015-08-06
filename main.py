#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import webapp2
import jinja2
from google.appengine.ext import ndb


JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class User(ndb.Model):
    name = ndb.StringProperty()
    score = ndb.StringProperty()
    # points = ndb.IntegerProperty(required=False)
#
# class Score(ndb.Model):
#     points = ndb.IntegerProperty(required=True)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('index.html')
        self.response.write(template.render())

    def post(self):
        name = self.request.get('name')
        # points = self.request.get('points')
        # user = User(name=name, points=int(points))
        user = User(name=name)
        user_key = user.put()
        self.redirect('/')

class GameHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('game.html')
        self.response.write(template.render())


class ScoreboardHandler(webapp2.RequestHandler):
    def get(self):
        points =[]
        user_query = User.query()
        user_query = user_query.order(-User.score)
        user_data = user_query.fetch(10)
        template_params = {}
        template_params['users'] = user_data
        # template_params['points'] = points

        template = JINJA_ENVIRONMENT.get_template('scoreboard.html')
        self.response.write(template.render(template_params))

    def post(self):
        name = self.request.get('name')
        score = self.request.get('user_score')
        # points = self.request.get('points')
        # user = User(name=name, points=int(points))
        user = User(name=name, score=score)
        user.put()
        self.redirect('/scoreboard')

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/scoreboard', ScoreboardHandler),
    ('/game', GameHandler)
], debug=True)
