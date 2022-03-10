# jiralist

**The idea:**  
create a checklist app that connects to Jira to list out your current issues (todo, and in progress). when you cross-out an item, it will group into the date you crossed it out on.

bootsrapped with react/typescript template based on the [arno](https://github.com/smashingboxes/arno) react native template.

![login-sc](https://user-images.githubusercontent.com/32459751/120070095-ef3b7280-c0bb-11eb-8ce3-3dc43de87d42.png)
![home-sc](https://user-images.githubusercontent.com/32459751/120070099-f1053600-c0bb-11eb-8091-1a6dc0a9283f.png)

# getting started

```bash
npm install
npm run start
```

# file structure

```bash
modules/
    # `core` includes all shared components
    # we could include these files inside a `component/` to make it adhere to the `module` structure
    # but i think its unnecessary bc i don't think we would connect these files into containers
    core/
      Styles.ts # different typefaces and colors specific to this project
    home/ # a module
    todo.sample/ # the traditional todo list example
        components/ # dumb components
        containers/ # smart components
    module.template/ # a minimal module template that can be used to start a new module
        components/ # dumb components
        containers/ # smart components
```
