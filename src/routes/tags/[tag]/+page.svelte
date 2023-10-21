<script>

export let data;

const tag = data.tag;

</script>


<div class="container flex items-center align-middle justify-center">
    <h1 class="h1">
        <span class="italic rounded-xl variant-glass-primary">#{tag}</span>
    </h1>
</div>



<pre>{JSON.stringify(data, null, 2)}</pre>
