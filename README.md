Node JS with TypeScript

<ul>

<li> First Install TypeScript using <code>npm install -g typescript</code> </li>

<li> Then open the Command Prompt and run <code> npm install </code> or <code> npm i </code> to generate the <code>node_modules </code> folder </li>

<li> Then open the Command Prompt and type <code>tsc</code> <small>(tsc => typescript compiler)</small> and press <b>enter</b> </li>

<li> A folder named <code>dist</code> should be created with the <code>.js</code> files for all <code>.ts</code> files </li>

<li> Now in the command prompt, run <code>npm run dev</code> or <code>npm start</code> </li>

<li> 
	<ul>
		<li> <code> npm run dev </code> = <code> nodemon dist/app.js </code>  : &nbsp; To be used in Development Server </li>
		<li> <code> npm start </code> = <code> node dist/app.js </code>  : &nbsp; To be used in Production Server </li>
	</ul>
</li>

<li> The default port is <code>3022</code>, and the URL is <a href="javascript:void(0)">http://localhost:3022</a> </li>

</ul>
