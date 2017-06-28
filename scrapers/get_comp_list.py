import json
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
in_file_name = dir_path + '/../json_server/public/data/mayo_fixtures.json'

jsonText = "";
with open(in_file_name,'r') as f:
    jsonText = f.read();

fixtures = json.loads(jsonText);
clubs = fixtures.keys();
def unpackFixtures(fixtures,club,venue='home'):
    fixType = venue+'_fixtures'
    try:
        return fixtures[club][fixType]
    except KeyError:
        return []

fixtureLists = map(lambda club: unpackFixtures(fixtures,club), clubs)
fixtureList = reduce(lambda a,b: a + b,fixtureLists)
compList = map(lambda x: x['comp'], fixtureList)
compSet = set(compList)



out_file_name = dir_path + '/../json_server/public/data/complist.csv'
with open(out_file_name,'a') as f:
    for comp in compSet:
        f.write(comp+'\n')
