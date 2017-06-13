from bs4 import BeautifulSoup
import requests
import json
import os
import bleach

urls = {
            "North": "http://mayogaa.com/content_page/54798/",
            "South": "http://mayogaa.com/content_page/57745/",
            "East": "http://mayogaa.com/content_page/57751/",
            "West": "http://mayogaa.com/content_page/57741/"
        }
team_details = {}
for region, url in urls.items():
    r  = requests.get(url)
    data = r.text.encode('utf-8').decode('ascii', 'ignore')
    soup = BeautifulSoup(data)
    teams_list = soup.find('div',{'class','col-md-12'})
    team_paras = teams_list.find_all("p")

    for team in team_paras:
        txt = str(team.encode('utf-8'))
        txt = txt.replace('<br/>','~')
        stripped = bleach.clean(txt, tags=[], strip=True)
        details = stripped.split('~')
        team_name = details.pop(0)
        if team_name == "":
            team_name = details.pop(0)
        team_details[team_name] = {}
        team_details[team_name]['region'] = region
        for detail in details:
            kv = detail.split(":", 1)
            if(len(kv)<2):
                continue
            k = kv[0]
            if k == "Colours":
                v = map(lambda x: x.strip(), kv[1].replace("&amp;",",").split(","))
            else:
                try:
                    v = kv[1].strip()
                except IndexError:
                    print team_name
                    print kv
            team_details[team_name][k]=v

clubInfoJson = json.dumps(team_details, ensure_ascii=False, indent=4, sort_keys=True).encode('ascii', 'xmlcharrefreplace')
clubInfoJson.replace("&#160;","").replace(':"','"')
dir_path = os.path.dirname(os.path.realpath(__file__))
out_file_name = dir_path + '/../json_server/public/data/mayo_clubs_details.json'
with open(out_file_name, 'w') as f:
    f.write(clubInfoJson)
