# arno-www
react/typescript template based on the [arno](https://github.com/smashingboxes/arno) react native template.

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
