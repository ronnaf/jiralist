# jiralist

![jiralist_login](https://user-images.githubusercontent.com/32459751/118410855-2b3a0500-b6c4-11eb-8973-aff1d2b47259.png)
![jiralist_home](https://user-images.githubusercontent.com/32459751/118410856-2ffeb900-b6c4-11eb-97f6-705a9e2350e2.png)

> react/typescript template based on the [arno](https://github.com/smashingboxes/arno) react native template.

**rough idea:**  
create a checklist app that connects to Jira to list out your current issues (todo, and in progress). when you cross-out an item, it will group into the date you crossed it out on.

## file structure

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
