export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export DERBY_INSTALL=/opt/Apache/db-derby-10.17.1.0-bin
export CLASSPATH=/opt/Apache/db-derby-10.17.1.0-bin/lib/derby.jar:/opt/Apache/db-derby-10.17.1.0-bin/lib/derbytools.jar:/opt/Apache/db-derby-10.17.1.0-bin/lib/derbyoptionaltools.jar:/opt/Apache/db-derby-10.17.1.0-bin/lib/derbyshared.jar:.
export SPARK_HOME=/Users/hannandesai/Documents/Libs/spark-3.5.1-bin-hadoop3
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"

# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/opt/anaconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

