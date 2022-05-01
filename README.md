Contains backend and frontend implementation for polling app, powered by Sockets

### How to start project
- Clone it
- Run backend on 3000 port
- Run React app then 

### Some commands
- Command for deploy sub-dir on heroku using git 
```
    From (https://stackoverflow.com/a/10648623/10386258)

  There's an even easier way via git-subtree. Assuming you want to push your folder 'backend' as the root to Heroku, you can do:
    git subtree push --prefix backend heroku master
  It appears currently that git-subtree is being included into git-core, but I don't know if that version of git-core has been released yet.
```

- Command to set env var in heroku
```

From (https://stackoverflow.com/a/54297672/10386258)

    heroku config:set $(cat .env | sed '/^$/d; /#[[:print:]]*$/d')
```

- Command to see heroku envs
```
https://stackoverflow.com/questions/47291416/how-to-print-environment-variables-on-heroku
```

### Todo bugs
- [x] avoid extra callbacks on client side, it not good from performance point of view
- [x] allow person to vote for at max 3 times
- [ ] setup CI-CD for netlify