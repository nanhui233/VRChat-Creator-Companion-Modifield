// AddNewRouter(
//   '/thanks',
//   `
//     <div class="plugins-list-header">
// 		<div class="title">
// 			<span class="fui-Title1 fui-Text ___131zmfu fk6fouc fccw675 f1ebx5kk fl43uef fpgzoln f1w7gpdv f6juhto f1mtd64y f1y7q3j9 f2jf649">Thanks</span><br>
// 			<span class="fui-Body1 fui-Text ___nzdt000 fk6fouc fkhj508 f1i3iumi figsok6 fpgzoln f1w7gpdv f6juhto f1mtd64y f1y7q3j9 f2jf649">感谢下列人员，有了他们才有这个程序</span>
// 		</div>
// 	</div>
//     <ul>
//       <li onclick="openInBrowser('https://space.bilibili.com/442052974')">
// 		<img src="http://q1.qlogo.cn/g?b=qq&nk=3433796750&s=100">
// 		<div class="username">南方の辉</div>
// 		<div class="type">中文翻译/程序设计/界面设计/主要开发</div>
// 	  </li>
//     </ul>
//   `,
//   `
// 	.plugins-list-header{
// 		display: flex;
// 		flex-direction: row;
// 		-webkit-box-align: center;
// 		align-items: center;
// 		margin-bottom: var(--spacingVerticalXL);
// 	}
	
//     #vcc-panel-_thanks h2 {
//       color: #2BAAC1;
//       border-bottom: 2px solid #2BAAC1;
//       padding-bottom: 8px;
//     }
//     #vcc-panel-_thanks ul {
//       list-style: none;
//       padding: 0;
//     }
//     #vcc-panel-_thanks li {
// 		position:absolute;
// 		display:flex;
// 		flex-direction: row;
// 		align-items: center;
// 		padding: 8px 12px;
// 		background: #292929;
// 		border-radius: 4px;
// 		margin-bottom: 6px;
// 		cursor:pointer;
// 		width:80%;
//     }
//     #vcc-panel-_thanks li:hover {
//       background: var(--colorNeutralBackground1Hover);
//     }
// 	#vcc-panel-_thanks li img {
// 		position:relative;
// 		width:32px;
// 		height:32px;
// 		margin-right:10px;
// 		border-radius:5px;
// 	}
// 	#vcc-panel-_thanks li .username {
// 		position:relative;
// 		font-size:18px;
// 		font-weight:bold;
// 	}
// 	#vcc-panel-_thanks li .type {
// 		position:relative;
// 		left:20px;
// 		color:#939393;
// 	}
//   `
// );

AddNewRouterFromFile('/thanks', '/mods/thanks/main.html', '/mods/thanks/main.css');
// AddNewRouterFromFile('/thanks', 'main.html', 'main.css');