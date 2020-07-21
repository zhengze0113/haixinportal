<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    meta: {
      type: Object,
      default: () => {
        return {
          title: '',
          icon: ''
        };
      }
    },
    path: {
      type: String,
      default: ''
    },
    currentRoute: {
      type: String,
      default: ''
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  render(h, context) {
    let { meta: { icon }, path } = context.props;
    const { meta: { title }, currentRoute, collapse } = context.props;

    const vnodes = [];
    path = path.slice(1);

    if (currentRoute && path && currentRoute.indexOf(path) !== -1) {
      icon = icon + '_active';
    }
    if (icon) {
      if (collapse) { // 展开状态
        vnodes.push(<png-icon icon-class={icon}/>);
      } else {
        vnodes.push(<png-icon icon-class={icon} title={title}/>);

      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>);
    }
    return vnodes;
  }
};
</script>
