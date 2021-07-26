# RuntimeX
Embed power in your websites.

## We have moved to codesandbox!
Check out our open-sourced live view of RuntimeX!
(Click here!)[https://codesandbox.io/s/runtimex-8w6hh]

[Visit our website](https://8w6hh.csb.app/) for more info. You can also [Visit the github pages website](https://minecraftpublisher.github.io/RuntimeX/).

RuntimeX - Embed power in your websites.

## What's RuntimeX?
RuntimeX is a vanilla javascript library that allows you to write custom code in script tags.
## How do i use it?
You can import RuntimeX by adding this piece of HTML code, just above the </body> tag:

```HTML
<script src="//runtimex.martiaforoud.repl.co/runtimex.js"></script>
```

And then you can write RuntimeX code in your document like this:

```BASIC
<script type="text/runtime">
START
:MAIN
ECHO "Hello RuntimeX!"
SET "test" "This is a variable!"
ECHO test
:MAIN END

:RUNTIME
ECHO "This code runs every second!"
ECHO "Also, you don't need to make everything uppercase!"
SET "test2" "This is another variable!"
:RUNTIME END
</script>
```
