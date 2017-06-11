from bs4 import BeautifulSoup
import requests
import json
import os

url = "http://mayogaa.com/latestfixtures/"
r  = requests.get(url)
data = r.text
soup = BeautifulSoup(data)
league_table = soup.find('div',{"class","league-table"})
relevant_rows = league_table.find_all(attrs={"class":lambda x: x and x in ["date-header", "compheader", "column-six"]})

current_date = ""
current_comp = ""
fixtures_by_club = {}
for elem in relevant_rows:
    clazz = " ".join(elem.get("class"))
    if clazz == "date-header":
        current_date = elem.text
    elif clazz == "compheader":
        current_comp = elem.find('label').text
    elif clazz == "column-six table-body":
        lis = elem.find_all('li')
        fixture_details = [li.text.encode('utf-8').decode('ascii', 'ignore') for li in lis]
        fixture = {}
        fixture['comp'] = current_comp;
        fixture['home_team'] = fixture_details[1];
        fixture['away_team'] = fixture_details[2];
        fixture['pitch'] = fixture_details[3];
        fixture['referee'] = fixture_details[4];
        fixture['date'] = current_date;
        fixture['time'] = fixture_details[0];

        #Add fixture to home club fixture list
        try:
            fixtures_by_club[fixture['home_team']]['home_fixtures'].append(fixture)
        except KeyError: #Create a for club if this is the first fixture
            try:
                fixtures_by_club[fixture['home_team']]['home_fixtures'] = []
                fixtures_by_club[fixture['home_team']]['home_fixtures'].append(fixture)
            except KeyError:
                fixtures_by_club[fixture['home_team']] = {}
                fixtures_by_club[fixture['home_team']]['home_fixtures'] = []
                fixtures_by_club[fixture['home_team']]['home_fixtures'].append(fixture)

        try:
            fixtures_by_club[fixture['away_team']]['away_fixtures'].append(fixture)
        except KeyError: #Create a for club if this is the first fixture
            try:
                fixtures_by_club[fixture['away_team']]['away_fixtures'] = []
                fixtures_by_club[fixture['away_team']]['away_fixtures'].append(fixture)
            except KeyError:
                fixtures_by_club[fixture['away_team']] = {}
                fixtures_by_club[fixture['away_team']]['away_fixtures'] = []
                fixtures_by_club[fixture['away_team']]['away_fixtures'].append(fixture)

fixtureJson = json.dumps(fixtures_by_club, indent=4, sort_keys=True);
dir_path = os.path.dirname(os.path.realpath(__file__))
out_file_name = dir_path + '/../json_server/public/data/mayo_fixtures.json'
with open(out_file_name, 'w') as f:
    f.write(fixtureJson)
