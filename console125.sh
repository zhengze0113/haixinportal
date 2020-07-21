echo "打包镜像"
docker build -t cnooc-console:1.2 .
echo "运行portal"
docker save -o console.tar cnooc-console:1.2
echo "执行结束"

