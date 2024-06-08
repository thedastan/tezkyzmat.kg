const GoogleTagManager4 = () => {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-H79YZMDZJR');
            `
			}}
		/>
	)
}

export default GoogleTagManager4
