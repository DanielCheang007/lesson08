const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      msg: "Page Title",
      present: false,
      location: [0, 0],
      direction: "left",
      pages: [
        [
          { title: "Page 0", content: "Page 0's content" },
          { title: "Page 0.1", content: "Page 0.1's content" }
        ],
        [{ title: "Page1", content: "Page1" }]
      ]
    };
  },
  computed: {
    currentPage() {
      const [x, y] = this.location;
      return this.pages[x][y];
    }
  },
  methods: {
    onPageChange(pageNewContent) {
      console.log("on change", pageNewContent);
      Object.assign(this.currentPage, pageNewContent);
    },
    moveUp() {
      const [x, y] = this.location;
      this.location = [x, y - 1 < 0 ? 0 : y - 1];
      this.direction = "down";
    },
    moveDown() {
      const [x, y] = this.location;
      const len = this.pages[x].length;
      this.location = [x, y < len - 1 ? y + 1 : y];
      this.direction = "up";
    },
    moveLeft() {
      const [x, y] = this.location;
      this.location = [x - 1 < 0 ? 0 : x - 1, 0];
      this.direction = "right";
    },
    moveRight() {
      const [x, y] = this.location;
      const len = this.pages.length;
      this.location = [x < len - 1 ? x + 1 : x, 0];
      this.direction = "left";
    },

    addSubPage() {
      const [x, y] = this.location;
      this.pages[x].splice(y + 1, 0, {
        title: "untitled",
        content: "new Sub Page"
      });

      this.location = [x, y + 1];
      this.direction = "up";
    },
    addPageGroup() {
      const [x, y] = this.location;
      this.pages.splice(x + 1, 0, [
        { title: "untitled", content: "new Page Group" }
      ]);
      this.location = [x + 1, 0];
      this.direction = "left";
    }
  }
});

app.component("page-detail", {
  props: ["page", "location"],
  data() {
    return {
      title: "This is page title",
      content: "this is page content"
    };
  },
  template: document.querySelector(".page-detail").outerHTML
});

app.component("page-form", {
  props: ["page", "location"],
  data() {
    return {
      title: null,
      content: null
    };
  },
  watch: {
    page: {
      handler(newVal, oldVal) {
        const { title, content } = newVal;
        this.title = title;
        this.content = content;
      },
      immediate: true
    }
  },
  methods: {
    reset() {
      const { title, content } = this.page;
      this.title = title;
      this.content = content;
    },
    onSubmit() {
      const { title, content } = this;
      this.$emit("content-changed", { title, content });
    }
  },
  template: document.querySelector(".page-form").outerHTML
});

app.component("page-mark", {
  props: ["location"],
  template: document.querySelector(".page--mark").outerHTML
});

app.mount("#app");