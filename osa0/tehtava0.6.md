1) Ohjelma lähettää syötetyn muistiinpanon:
browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server
deactivate server

Tässä SPA sovelluksessa ei ladata sivua ja haeta tietueita uudestaan - uusin lisätty muistiinpano vain lisätään listaan spa.js tiedoston metodissa.