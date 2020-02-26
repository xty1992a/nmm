<template>
  <div class="home">
    <div class="block folder-block" v-for="item in folders">
      <p>{{item | folderName}}</p>
    </div>
    <div class="block add-block" title="添加目录" @click="openFolder">
      <span>+</span>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'Home',
	props: {},
	components: {},
	data() {
	  return {
		folders: []
	  };
	},
	async created() {
	  this.getFolders();
	},
	filters: {
	  folderName(item) {
		return item.split('\\').slice(-1)[0];
	  },
	},
	methods: {
	  async getFolders() {
		const folders = await this.$services.notice('getGalleryFolder');
		if (!folders.success) return;
		this.folders = folders.data;
		console.log(this.folders);
	  },

	  async openFolder() {
		const result = await this.$services.notice('addGalleryFolder');
		if (!result.success) return;
		this.folders = result.data;
	  },

	  relaunch() {
	  }
	},
	computed: {}
  };
</script>

<style lang="less" rel="stylesheet/less">

  .home {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;

    .block {
      border: 1px solid #919191;
      margin-right: 20px;
      border-radius: 5px;
      cursor: pointer;
      height: 100px;
      width: 100px;
    }

    .add-block {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 60px;
    }
  }
</style>
