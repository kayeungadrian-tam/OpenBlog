<script lang="ts">
</script>

<div class="container h-full mx-auto flex justify-center my-8">
	<form method="POST">
		<div class="space-y-8 text-center flex flex-col items-center">
			<h2 class="h2">Welcome Back!</h2>

			<button formaction="?/login&provider=google" class="btn variant-outline-tertiary">
				<span>
					<img
						src="https://img.icons8.com/color/48/000000/google-logo.png"
						class="w-6"
						alt="google"
					/>
				</span>
				<span>Sign in with Google</span>
			</button>

			<button formaction="?/login&provider=slack" class="btn variant-outline-tertiary">
				<span>
					<img
						src="https://img.icons8.com/color/48/000000/slack-new.png"
						class="w-6"
						alt="google"
					/>
				</span>
				<span>Sign in with Google</span>
			</button>

			<button formaction="?/login&provider=github" class="btn variant-outline-tertiary">
				<span>
					<img src="https://img.icons8.com/color/48/000000/github.png" class="w-6" alt="google" />
				</span>
				<span>Sign in with Github</span>
			</button>
		</div>
	</form>
</div>
