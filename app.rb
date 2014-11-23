require 'rapgenius'
require 'pp'
require 'json'
require 'soundcloud'
require 'sinatra'
require 'oj'


def search_by_lyrics(query, number)
	strings = RapGenius.search_by_lyrics(query)[0..2].collect do | song |
		song.title + " - " + song.artist.name
	end
	strings.join("\n")
end

def search_by_title(query, number)
	strings = RapGenius.search_by_title(query)[0..5].collect do | song |
		puts song
	end
end

def getLyrics(query)
  song = RapGenius.search_by_title(query)[0]
  #puts song.title
  #iterate_lyrics(song)
end

def concat_lyrics(buffer,current)
  if(current.lyric[0] == ",")
    buffer << "<br><br>"
  else
    buffer << "<br>"+current.lyric.to_s
  end
end

def iterate_lyrics(song)
  result_lyrics=""
  current_lines = song.lines
  current_lines.each{|current| concat_lyrics(result_lyrics,current)}
  result_lyrics
end



get '/' do
    'Nothin\' here homie'
end

get '/lyrics/:name' do
      content_type :json
     result = getLyrics(params['name'])
     if result.nil?
       Oj.dump({:result => "404"})
     else
       Oj.dump({:result => result.lines})
     
     end
end

def rap_genius_from_name(query, number)
	rapgenius_object_id = RapGenius.search_by_lyrics(query)[0]["id"]
	"genius.com/songs/" + id
end
